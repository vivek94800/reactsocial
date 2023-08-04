class ApplicationController < ActionController::Base
    protect_from_forgery with: :null_session
    before_action :current_user



    # def current_user
    #   token = request.headers['Authorization']&.split(' ')&.last
    #   if token
    #     user_id = decode_token(token)
    #     if user_id
    #       @current_user = User.find_by(id: user_id)
    #     end
    #   end
  
    #   unless @current_user
    #     render json: { error: 'No current user' }, status: :not_found
    #   end
    # end


    
    private

    def generate_token(user_id)
      
      JWT.encode({ user_id: user_id }, Rails.application.secrets.secret_key_base, 'HS256')
    end
    
    def decode_token(token)
      begin
        decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
        return decoded_token[0]['user_id']
      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        return nil
      end
    end
  

    def authenticate_user
      token = request.headers['Authorization']&.split(' ')&.last
      user_id = decode_token(token)
      if user_id
        @current_user = User.find_by(id: user_id)
      else
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end

    def current_user
      return @current_user
    end

end
