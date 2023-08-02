Rails.application.routes.draw do
 root 'homepage#index'
#  get '*path', to: 'homepage#index'
 post '/login', to: 'users#login'
 post '/register', to: 'registration#create'
  # Posts
  get '/posts', to: 'posts#index'
  get '/posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  patch '/posts/:id', to: 'posts#update'
  delete '/posts/:id', to: 'posts#destroy'

  # Likes
  post '/likes/:post_id', to: 'likes#create'
  delete '/likes/:post_id', to: 'likes#destroy'

  # Comments
  get '/posts/:post_id/comments', to: 'comments#post_comments'
  post '/comments/:post_id', to: 'comments#create'
  delete '/comments/:post_id/:id', to: 'comments#destroy'
  post '/comments/:id/like', to: 'comments#like', as: :like_comment
post '/comments/:id/unlike', to: 'comments#unlike', as: :unlike_comment
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/users/:id', to: 'users#show'

  # Defines the root path route ("/")
  # root "articles#index"
  get '*path', to: 'homepage#index'
end
