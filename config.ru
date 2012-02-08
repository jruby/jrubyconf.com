$:.unshift(File.expand_path('../lib', __FILE__)).uniq!
require 'main'
require 'middleware'

if development?
  require 'sinatra/reloader'
  require 'jekyll_regen'
  JRubyConf::JekyllRunner.main
  also_reload 'lib/*.rb'
  use Rack::ShowExceptions
end

set :run, false
set :public_folder, './public'
set :views, './views'

use DotHtmlRewriter
use DbConnectionManagement
run Sinatra::Application

# Local Variables:
# mode: ruby
# End:
