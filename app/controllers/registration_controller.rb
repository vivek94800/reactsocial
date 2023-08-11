class RegistrationController < ApplicationController
    
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    require 'sendgrid-ruby'
    include SendGrid

   
    def create
      user = User.new(user_params)
      user.active = true 

      if user.save
        jwt_token = generate_token(user.id)
        send_welcome_email(user)
        render json: { token: jwt_token }
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end
  
    private
  
   

    def send_welcome_email(user)
      from = Email.new(email: 'bala.krishna@jarvis.consulting')
      to = Email.new(email: user.email)
      subject = 'Welcome to Your App!'
      content = Content.new(type: 'text/plain', value: 'Thank you for signing up!')
      mail = SendGrid::Mail.new(from, subject, to, content)
  
      sg = SendGrid::API.new(api_key: SendGrid::API_KEY)
      response = sg.client.mail._('send').post(request_body: mail.to_json)
  
      puts response.status_code
      puts response.body
      puts response.headers
    end

    def user_params
      params.permit(:username, :email, :password, :password_confirmation, :phone_number)
    end

  end
  