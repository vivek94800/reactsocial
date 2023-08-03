class Ability
  include CanCan::Ability

  def initialize(user)
    # Use @current_user here to access the current user
    puts "okay testing"
    if user.has_role?(:admin)
      "okay"
      can :destroy, Post
      can :destroy, Comment
      can :index, Post
      can :index, User
    end
  end
end
