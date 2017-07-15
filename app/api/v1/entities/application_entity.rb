module V1
  module Entities
    class ApplicationEntity < Grape::Entity
      format_with(:iso8601, &:iso8601)
    end
  end
end
