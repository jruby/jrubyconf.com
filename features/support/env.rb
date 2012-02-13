# Generated by cucumber-sinatra. (2012-02-05 18:16:20 -0600)

ENV['RACK_ENV'] = 'test'

$:.unshift File.expand_path('../../../lib', __FILE__)
require 'main'

set :environment, :test
set :public_folder, File.expand_path("../../../public", __FILE__)
set :views, File.expand_path("../../../views", __FILE__)

require 'capybara'
require 'capybara/cucumber'
require 'capybara/webkit'
require 'rspec'

Capybara.configure do |config|
  config.default_wait_time = 5
  config.app = Sinatra::Application
  config.automatic_reload = false
  config.javascript_driver = :webkit

  Capybara.register_driver :webkit_cmd_debug do |app|
    browser = Capybara::Driver::Webkit::Browser.new
    def browser.command(name, *args)
      $stdout.print "WK: #{name}#{args.inspect} => "
      super.tap {|result| $stdout.puts result.inspect }
    end
    Capybara::Driver::Webkit.new(app, :browser => browser)
  end
  # config.javascript_driver = :webkit_cmd_debug
end

# Mail test setup
Mail.defaults do
  delivery_method :test
end

App::Config::CONFIG['production_site'] = true # pretend we are production
App::Config::CONFIG['email_from']  = 'test@example.com'
App::Config::CONFIG['email_admin'] = 'admin@example.com'

class Sinatra::ApplicationWorld
  include Capybara::DSL
  include RSpec::Expectations
  include RSpec::Matchers
  include Mail::Matchers

  def main_nav_offscreen
    page.evaluate_script('$("#main_navigation").css("top")') =~ /^-\d+px/
  end
end

World do
  Sinatra::ApplicationWorld.new
end

Before do
  Mail::TestMailer.deliveries.clear
end

Before('@javascript') do
  page.reset!
end
