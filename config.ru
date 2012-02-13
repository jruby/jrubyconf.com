LIB = File.expand_path('../lib', __FILE__)
$:.unshift(LIB).uniq!
require 'sinatra'

if development?
  require 'sinatra/reloader'
  require 'jekyll_regen'
  JRubyConf::JekyllRunner.main
  also_reload File.join(LIB, '*.rb')
  use Rack::ShowExceptions
end

require 'main'
require 'middleware'

set :run, false
set :public_folder, './public'
set :views, './views'
set :logging, true
set :dump_errors, true

use DotHtmlRewriter
use DbConnectionManagement
run Sinatra::Application

# Local Variables:
# mode: ruby
# End:
