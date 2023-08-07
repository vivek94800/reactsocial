class RegistrationController < ApplicationController
    
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
   
    def create
      user = User.new(user_params)
      user.active = true 

      if user.save
        jwt_token = generate_token(user.id)
        render json: { token: jwt_token }
      else
        render json: { error: user.errors.full_messages.join(', ') }, status: :unprocessable_entity
      end
    end
  
    private
  
    def user_params
      params.permit(:username, :email, :password, :password_confirmation, :phone_number)
    end
  end
  