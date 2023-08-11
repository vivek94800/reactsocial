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

    def total_likes
      post = Post.find(params[:post_id])
      total_likes = post.likes.count
      is_liked = post.likes.where(user_id: current_user.id).exists? if current_user
    
      render json: { totalLikes: total_likes, isLiked: is_liked }
    end

    def export_posts_data
      if current_user.has_role?(:admin)
        posts = Post.includes(:comments, :likes)
        respond_to do |format|
          format.json { render json: generate_posts_report_data(posts) }
          format.csv { send_data generate_posts_csv(posts), filename: "posts_report.csv" }
          format.xlsx { send_data generate_posts_xlsx(posts), filename: "posts_report.xlsx" }
        end
      else
        render json: { success: false, message: "You are not authorized to export posts data." }, status: 401
      end
    end
  
    private
  
    def generate_posts_report_data(posts)
      posts.map do |post|
        {
          title: post.title,
          description: post.content,
          comments: post.comments.count,
          likes: post.likes.count
        }
      end
    end
  
    def generate_posts_csv(posts)
      require 'csv'
      CSV.generate(headers: true) do |csv|
        csv << ["Title", "Description", "Comments", "Likes"]
        generate_posts_report_data(posts).each do |post_data|
          csv << post_data.values
        end
      end
    end
  
    def generate_posts_xlsx(posts)
      require 'axlsx'
      Axlsx::Package.new do |p|
        p.workbook.add_worksheet(name: "Posts Report") do |sheet|
          sheet.add_row ["Title", "Description", "Comments", "Likes"]
          generate_posts_report_data(posts).each do |post_data|
            sheet.add_row post_data.values
          end
        end
      end.to_stream.read
    end
  
    def post_params
      params.require(:post).permit(:title, :content)
    end
  end