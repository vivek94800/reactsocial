class User < ApplicationRecord
  rolify
    has_secure_password
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy

    after_create :assign_role
    validates :email, presence: true, uniqueness: true
    validates :phone_number, presence: true, uniqueness: true, format: { with: /\A\d{10}\z/, message: "given is in invalid format." }

    private

    def assign_role
      if self.email=='admin@gmail.com'
        self.add_role(:admin)
      else
        self.add_role(:user)
      end
    end
end
