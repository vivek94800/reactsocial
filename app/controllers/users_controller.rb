class UsersController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :authenticate_user, except: [:login]
    require 'csv'
    require 'roo'
    require 'sendgrid-ruby'
    include SendGrid


    def index
      if can?(:index, User)
          @users = User.with_role(:user)
          render json: {success:true, message: "All users fetched successfully.", data: @users}, status:200
      else
          render json: {success:false, message: "You are not admin."}, status:400
      end
  end
   
    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          if user.active
            jwt_token = generate_token(user.id)
            render json: { token: jwt_token , user: user }
          else
            render json: { error: 'User is deactivated and not allowed to log in.' }, status: :unauthorized
          end
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def show
        @user = User.find(params[:id])
        render json: @user, only: :username
      end
      
    # def current_user
    #   return true
    # end

    def activate_deactivate
      @user = User.find(params[:id])
    
      if @user.update(active: !@user.active)
        render json: { success: true, message: "User status updated successfully." }
      else
        render json: { success: false, message: "Failed to update user status." }, status: :unprocessable_entity
      end
    end



    def export_users_data
      if can?(:index, User) # Check if the user has the ability to view user data
        users = User.includes(:posts, :comments, :likes)

        include_users_with_10_posts = params[:include_users_with_10_posts] == "true"
    
        if include_users_with_10_posts
         users = users.select { |user| user.posts.count > 10 }
       end
    
        respond_to do |format|
          format.json { render json: generate_report_data(users) }
          if current_user.has_role?(:admin) # Check if the current user is an admin
            format.csv { send_data generate_csv(users), filename: "user_report.csv" }
            format.xlsx { send_data generate_xlsx(users), filename: "user_report.xlsx" }
          else
            format.csv { render json: { message: "You are not authorized to download CSV files." }, status: :unauthorized }
            format.xlsx { render json: { message: "You are not authorized to download XLSX files." }, status: :unauthorized }
          end
        end
      else
        render json: { success: false, message: "You are not admin." }, status: 400
      end
    end

    def upload_users_data
      if current_user.has_role?(:admin) # Check if the current user is an admin
        file = params[:file]
        if file.present?
          users_data = parse_uploaded_file(file)
          create_users_from_data(users_data)
          send_upload_notification_email(users_data.count)
          render json: { success: true, message: 'Users uploaded successfully.' }
        else
          render json: { success: false, message: 'No file uploaded.' }, status: :unprocessable_entity
        end
      else
        render json: { success: false, message: 'You are not authorized to upload users.' }, status: :unauthorized
      end
    end
   


    private

    def send_upload_notification_email(user_count)
      from = Email.new(email: 'bala.krishna@jarvis.consulting') 
      to = Email.new(email: 'vivekmshirdhonkar@gmail.com')     
      subject = 'Users Upload Notification'
      content = Content.new(type: 'text/plain', value: "#{user_count-1} users were uploaded successfully.")
      mail = SendGrid::Mail.new(from, subject, to, content)
  
      sg = SendGrid::API.new(api_key: SendGrid::API_KEY)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
  
      puts response.status_code
      puts response.body
      puts response.headers
    end

    def generate_report_data(users)
      users.map do |user|
        {
          username: user.username,
          posts: user.posts.count,
          comments: user.comments.count,
          likes: user.likes.count
        }
      end
    end
  
    def generate_csv(users)
      require 'csv'
      CSV.generate(headers: true) do |csv|
        csv << ["Username", "Posts", "Comments", "Likes"]
        generate_report_data(users).each do |user_data|
          csv << user_data.values
        end
      end
    end
  
    def generate_xlsx(users)
      require 'axlsx'
      Axlsx::Package.new do |p|
        p.workbook.add_worksheet(name: "User Report") do |sheet|
          sheet.add_row ["Username", "Posts", "Comments", "Likes"]
          generate_report_data(users).each do |user_data|
            sheet.add_row user_data.values
          end
        end
      end.to_stream.read
    end

    def parse_uploaded_file(file)
      case File.extname(file.original_filename)
      when '.csv'
        Roo::CSV.new(file.path)
      when '.xlsx'
        Roo::Excelx.new(file.path)
      else
        raise 'Invalid file format'
      end
    end
    
    def create_users_from_data(data)
      header = data.row(1) # Assuming the first row contains headers
    
      (2..data.last_row).each do |i|
        row = Hash[[header, data.row(i)].transpose]
        puts "Processing row #{i}: #{row}"
        # phone_number = row['phone_number']
        row["phone_number"] = row["phone_number"].to_i.to_s 

  # if phone_number =~ /\A\d{10}\z/
  #   # Proceed with user creation
  # else
  #   puts "Invalid phone number format for row #{i}: #{phone_number}"
  #   # Handle this case as needed (e.g., skip this row, show an error message, etc.)
  # end
        user = User.new(row)
        if user.save
          puts "User created successfully: #{user.inspect}"
        else
          puts "User creation failed for row #{i}: #{user.errors.full_messages}"
        end
      end
    end
    
  end

      



