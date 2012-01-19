require 'sinatra'
require 'partials'
helpers Sinatra::Partials

['/', '/index.html'].each do |r|
  get r do
    require 'data'
    erb :index
  end
end

get %r{^/([a-z]+)$} do |scene|
  # From javascripts/UI.js, look for "new Scene" "container" property
  scenes = %w(information intro speakers schedule)
  if scenes.include?(scene)
    redirect '/#' + scene
  else
    404
  end
end
