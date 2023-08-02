# class AuthController < ApplicationController
#     protect_from_forgery with: :null_session

#     def login
#       user = User.find_by(email: params[:email])
#       if user&.authenticate(params[:password])
#         jwt_token = generate_token(user.id)
#         render json: { token: jwt_token }
#       else
#         render json: { error: 'Invalid email or password' }, status: :unauthorized
#       end
#     end
  
#     private
  
#     def generate_token(user_id)

#         JWT.encode({ user_id: user_id }, Rails.application.secrets.secret_key_base, 'HS256')
#       # Add your JWT token generation logic here using the 'jwt' gem
#       # For example, you can use 'JWT.encode' method to generate the token
#       # Set an expiration time for the token to make it more secure
#     end
#   end