require 'yaml'
require 'active_record'
require 'sinatra'

# Setup environment and connect to the database.
RACK_ENV = ENV['RACK_ENV'] || "development"
DB_SETTINGS = YAML.load_file("config/database.yml")[RACK_ENV]
ActiveRecord::Base.establish_connection(DB_SETTINGS)

require File.expand_path('../config', __FILE__)

# Register .html.erb templates
require 'tilt'
Tilt.register Tilt::ERBTemplate, 'html.erb'

require 'mail'
if App::Config.smtp_host
  Mail.defaults do
    delivery_method :smtp, :address => App::Config.smtp_host,
                           :port => App::Config.smtp_port,
                           :domain => App::Config.smtp_domain,
                           :user_name => App::Config.smtp_username,
                           :password => App::Config.smtp_password,
                           :authentication => :plain,
                           :enable_starttls_auto => true
  end
elsif development?
  Mail.defaults do
    delivery_method :file
  end
end
