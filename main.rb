require 'rubygems'
require 'sinatra'
require 'partials'
helpers Sinatra::Partials

not_found do
  redirect '/'
end

get '/' do
  require 'speakers'
  erb :index
end

get '/:hoobajoob' do
  redirect '/#' + params[:hoobajoob]
end