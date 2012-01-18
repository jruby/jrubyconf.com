$:.unshift(File.dirname(__FILE__)).uniq!

require 'main'

if development?
  require 'sinatra/reloader'
  also_reload 'data.rb'
  also_reload 'schedule.rb'
  use Rack::ShowExceptions
end

run Sinatra::Application