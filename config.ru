$:.unshift(File.expand_path('../lib', __FILE__)).uniq!

require 'main'

if development?
  require 'sinatra/reloader'
  require 'jekyll_regen'
  also_reload 'lib/data.rb'
  also_reload 'lib/schedule.rb'
  use Rack::ShowExceptions
end

set :run, false
set :public_folder, './public'
set :views, './views'
run Sinatra::Application