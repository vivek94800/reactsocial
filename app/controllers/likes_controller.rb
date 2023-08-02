class LikesController < ApplicationController
    protect_from_forgery with: :null_session
    skip_before_action :verify_authenticity_token
    
    def create
        @like = Like.create(user_id: 1, post_id: params[:post_id])
        render json: @like
      end
    
      def destroy
        @like = Like.find_by(user_id: 1, post_id: params[:post_id])
        @like.destroy
        head :no_content
      end
end
