module V1
  class BaseAPI < ApplicationAPI
    mount MessagesAPI
  end
end
