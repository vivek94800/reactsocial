class CommentsController < ApplicationController
    protect_from_forgery with: :null_session
    # skip_before_action :verify_authenticity_token
     before_action :authenticate_user
     skip_before_action :verify_authenticity_token, only: :create

    def create
      post = Post.find(params[:post_id])
      @comment = post.comments.new(comment_params.merge(user_id: current_user.id)) # Use current_user.username to get the username of the current user
      if @comment.save
        render json: @comment, status: :created
      else
        puts @comment.errors.full_messages
        render json: { error: "Error creating comment" }, status: :unprocessable_entity
      end
     
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
        params.require(:comment).permit(:content, :username)
      end
end
