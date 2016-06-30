SecureHeaders::Configuration.default do |config|
  config.hsts = :opt_out_of_protection

  default_src = ["'self'", "'unsafe-inline'", ENV['ASSET_HOST']]

  config.csp = {
    preserve_schemes: true,
    default_src: %w('none'),
    connect_src: %w('self'),
    font_src: %w('self' https:),
    frame_src: %w('self'),
    img_src: %w('self' https: data:),
    script_src: default_src + ['https://www.google-analytics.com'],
    style_src: default_src + [CarrierWave::Uploader::Base.asset_host]
  }
end
