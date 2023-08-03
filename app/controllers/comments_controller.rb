class CommentsController < ApplicationController
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
     before_action :authenticate_user
    def create
        @comment = Comment.create(comment_params.merge(user_id: @current_user.id, post_id: params[:post_id]))
        render json: @comment
      end
    
      def destroy
        @comment = Comment.find(params[:id])
        if can?(:destroy, @comment) || (@comment.user_id == @current_user.id)
          @comment.destroy
          render json: {success:true, message:"Comment destroyed successfully"}
        else
            render json: {success:false}, status: 400
        end
      end
    
      private
    
      def comment_params
        params.require(:comment).permit(:content)
      end
end
