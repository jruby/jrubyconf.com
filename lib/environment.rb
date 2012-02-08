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
