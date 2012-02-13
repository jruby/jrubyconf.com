require 'yaml'
require 'active_record'
require 'sinatra'

# Setup environment and connect to the database.
RACK_ENV = ENV['RACK_ENV'] || "development"
DB_SETTINGS = YAML.load_file("config/database.yml")[RACK_ENV]
ActiveRecord::Base.establish_connection(DB_SETTINGS)

module App
  module Config
    CONFIG_FILE = File.expand_path('../../_config.yml', __FILE__)
    LOCAL_CONFIG_FILE = File.expand_path('../../_config.local.yml', __FILE__)
    CONFIG = YAML.load_file(CONFIG_FILE)
    CONFIG.merge!(YAML.load_file(LOCAL_CONFIG_FILE)) if File.exist?(LOCAL_CONFIG_FILE)
    SUBMISSION_DEADLINE = CONFIG['submission_deadline']

    module_function

    def mail_from
      if production_site?
        CONFIG['email_from']
      end
    end

    def mail_admin
      if production_site?
        CONFIG['email_admin']
      end
    end

    def production_site?
      CONFIG['production_site']
    end

    def smtp_settings
      @smtp = CONFIG['smtp'] || {}
    end

    def smtp_host
      smtp_settings['host']
    end

    def smtp_domain
      smtp_settings['domain']
    end

    def smtp_username
      smtp_settings['username']
    end

    def smtp_password
      smtp_settings['password']
    end
  end
end

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
end
