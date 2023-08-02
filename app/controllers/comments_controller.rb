class CommentsController < ApplicationController
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
     before_action :authenticate_user
    def create
        @comment = Comment.create(comment_params.merge(user_id: 1, post_id: params[:post_id]))
        render json: @comment
      end
    
      def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        head :no_content
      end
    
      private
    
      def comment_params
        params.require(:comment).permit(:content)
      end
end
