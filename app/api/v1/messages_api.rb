module V1
  class MessagesAPI < ApplicationAPI
    version 'v1', using: :path

    resource :messages do
      params do
        requires :uuid, type: String
      end

      route_param :uuid do
        get do
          message = Message.find_by!(uuid: params[:uuid])
          present message, with: Entities::Message
        end
      end
    end
  end
end
