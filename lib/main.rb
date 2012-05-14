require 'environment'
require 'helpers'
require 'partials'

helpers do
  include Sinatra::Partials
  include Rack::Utils
  include App::Config
  include App::Helpers
  alias_method :h, :escape_html
end

not_found do
  erb :not_found
end

error ::Exception do
  response.status = 500
  content_type 'text/html'
  erb :server_error
end


['/', '/index.html'].each do |r|
  get r do
    require 'data'
    erb :index
  end
end

get %r{^/([a-z]+)/?$} do |scene|
  path = RootMappings[scene]
  if path
    redirect path
  else
    404
  end
end

get '/speakers/info' do
  erb :speaker_info
end
