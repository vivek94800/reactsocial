class LikesController < ApplicationController
    protect_from_forgery with: :null_session
    before_action :authenticate_user
    
    def create
        @like = Like.create(user_id: @current_user.id, post_id: params[:post_id])
        render json: @like
      end
    
      def destroy
        @like = Like.find_by(user_id: @current_user.id, post_id: params[:post_id])
        @like.destroy
        head :no_content
      end

      
end
