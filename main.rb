require 'rubygems'
require 'sinatra'

not_found do
  redirect '/'
end

get '/' do
  erb :index
end
