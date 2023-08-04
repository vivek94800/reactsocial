class UsersController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :authenticate_request, only: [:index]

    def index
      if can?(:index, User)
          @users = User.all
          render json: {success:true, message: "All users fetched successfully.", data: @users}, status:200
      else
          render json: {success:false, message: "You are not admin."}, status:400
      end
  end
   
    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          jwt_token = generate_token(user.id)
          render json: { token: jwt_token ,user: user}
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

        
end



