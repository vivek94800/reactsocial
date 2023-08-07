class UsersController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :authenticate_user, only: [:index]

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

        
end



