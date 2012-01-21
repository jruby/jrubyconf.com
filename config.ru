$:.unshift(File.expand_path('../lib', __FILE__)).uniq!

require 'main'

if development?
  require 'sinatra/reloader'
  require 'jekyll_regen'
  JRubyConf::JekyllRunner.main
  also_reload 'lib/data.rb'
  also_reload 'lib/schedule.rb'
  use Rack::ShowExceptions
end

set :run, false
set :public_folder, './public'
set :views, './views'

require 'dot_html_rewriter'
use DotHtmlRewriter
run Sinatra::Application

# Local Variables:
# mode: ruby
# End:
