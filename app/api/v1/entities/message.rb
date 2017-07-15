module V1
  module Entities
    class Message < ApplicationEntity
      expose :uuid
      expose :name
      expose :email
      expose :phone
      expose :message

      with_options(format_with: :iso8601) do
        expose :created_at
        expose :updated_at
      end
    end
  end
end
