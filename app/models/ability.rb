class Ability
  include CanCan::Ability

  def initialize(user)
    # Use @current_user here to access the current user
    # puts "okay testing"
    if user.has_role?(:admin)
      # "okay"
      # can :destroy, Post
      # can :destroy, Comment
      # can :index, Post
      # can :index, User
      can :manage, :all
    else
      can :create, Post
      can :update, Post, user_id: user.id
      can :destroy, Post, user_id: user.id
      can :read, Post, visibility: true
    end
    can :manage, Comment, user_id: user.id
    can :destroy, Comment, user_id: user.id
  end
end
