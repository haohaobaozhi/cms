class BaseAPI < Grape::API
  format :json
  prefix :api

  mount V1::BaseAPI

  add_swagger_documentation(
    doc_version: '1.0',
    info: {
      title: 'obduk CMS API'
    }
  )
end
