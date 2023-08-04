class PostsController < ApplicationController
  protect_from_forgery with: :null_session
  # skip_before_action :verify_authenticity_token
  before_action :authenticate_user    
  
  def index
    if current_user.has_role?(:admin)
      @posts = Post.includes(:comments, :likes).all
    else
      @posts = Post.includes(:comments, :likes).where("(visibility = true) OR (user_id = ? AND visibility = false)", current_user.id)
    end
    render json: @posts, include: [:comments, :likes]
    end
  
    def create
      visibility = params[:visibility] == "private" ? false : true
    @post = Post.create(post_params.merge(user_id: current_user.id, visibility: visibility))
    render json: @post
    end
  
    def update
      @post = Post.find(params[:id])
      if @post.user_id==@current_user.id
       @post.update(post_params)
       render json: {success: true, message: "Post updated successfully", data: @post}, status:200
      else
          render json: {success:false,message: "Post can't be updated as you didn't made it"}, status: 400
      end
    end
  
    def destroy
      @post = Post.find(params[:id])
      if(@post.user_id == @current_user.id || can?(:destroy, Post))
        @post.destroy
        render json: {success:true, message: "Post deleted successfully"}, status: 200
    else
        render json: {success:false, message: "Post can't be deleted as you didn't made it."}, status: 400
    end
      @posts = Post.includes(:comments, :likes).all # Fetch all posts after deletion
    end
  
    private
  
    def post_params
      params.require(:post).permit(:title, :content)
    end
end