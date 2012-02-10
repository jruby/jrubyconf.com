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

module AppConfig
  CONFIG = YAML.load(File.read(File.expand_path('../../_config.yml', __FILE__)))
  SUBMISSION_DEADLINE = CONFIG['submission_deadline']
end
