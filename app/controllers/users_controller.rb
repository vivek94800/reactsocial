class UsersController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
   
    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          jwt_token = generate_token(user.id)
          render json: { token: jwt_token }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
      def show
        @user = User.find(params[:id])
        render json: @user, only: :username
      end
end
