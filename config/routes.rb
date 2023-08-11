Rails.application.routes.draw do
 root 'homepage#index'
#  get '*path', to: 'homepage#index'
 post '/login', to: 'users#login'
 post '/register', to: 'registration#create'
  # Posts
  get '/posts', to: 'posts#index'
  get '/posts/export_posts_data', to: 'posts#export_posts_data'
  get '/posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  patch '/posts/:id', to: 'posts#update'
  delete '/posts/:id', to: 'posts#destroy'

  # Likes
  post '/likes/:post_id', to: 'likes#create'
  delete '/likes/:post_id', to: 'likes#destroy'
  get '/posts/:post_id/total_likes', to: 'posts#total_likes'

  # Comments
  get '/posts/:post_id/comments', to: 'comments#post_comments'
  post '/comments/:post_id', to: 'comments#create'
  delete '/comments/:post_id/:id', to: 'comments#destroy'
  post '/comments/:id/like', to: 'comments#like', as: :like_comment
post '/comments/:id/unlike', to: 'comments#unlike', as: :unlike_comment
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html


  get '/users/current_user', to: 'users#current_user'
  get '/users', to: 'users#index'
  put '/users/:id/activate_deactivate', to: 'users#activate_deactivate' 

  #reports
  get '/users/export_users_data', to: 'users#export_users_data', as: :export_users_data
  get '/users/:id', to: 'users#show'
  post "/users/upload_users_data", to: "users#upload_users_data"

  # Defines the root path route ("/")
  # root "articles#index"
  get '*path', to: 'homepage#index'
end
