class User < ApplicationRecord
  rolify
    has_secure_password
    has_many :posts, dependent: :destroy

    after_create :assign_role

    private

    def assign_role
      if self.email=='admin@gmail.com'
        self.add_role(:admin)
      else
        self.add_role(:user)
      end
    end
end
