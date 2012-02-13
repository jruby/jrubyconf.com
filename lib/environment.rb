require 'yaml'
require 'active_record'
require 'sinatra'

# Setup environment and connect to the database.
RACK_ENV = ENV['RACK_ENV'] || "development"
DB_SETTINGS = YAML.load_file("config/database.yml")[RACK_ENV]
ActiveRecord::Base.establish_connection(DB_SETTINGS)

# Register .html.erb templates
require 'tilt'
Tilt.register Tilt::ERBTemplate, 'html.erb'

require 'mail'

module App
  module Config
    CONFIG_FILE = File.expand_path('../../_config.yml', __FILE__)
    LOCAL_CONFIG_FILE = File.expand_path('../../_config.local.yml', __FILE__)
    CONFIG = YAML.load_file(CONFIG_FILE)
    CONFIG.update!(YAML.load_file(LOCAL_CONFIG_FILE)) if File.exist?(LOCAL_CONFIG_FILE)
    SUBMISSION_DEADLINE = CONFIG['submission_deadline']

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
  end
end
