require 'environment'
require 'models'
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

get '/proposals/new' do
  erb :proposals_closed
end

post '/proposals/save' do
  if params['id'] && !params['id'].empty? # existing proposal
    status = 200
    proposal = Proposal.find params['id']
    status = 404 unless proposal.key == params['key']

    if status < 400
      Proposal::EXPOSED_ATTRIBUTES.each do |attr|
        proposal[attr] = params[attr]
      end
      proposal.save!
    end

    status status
    erb :proposal_saved, :locals => { :proposal => proposal, :status => status }
  else
    erb :proposals_closed
  end
end

get '/proposals/edit/:key' do |key|
  halt :not_found unless key.length > 0

  proposal = Proposal.where(:key => key).first
  halt :not_found unless proposal

  erb :proposals_form, :locals => { :proposal => proposal }
end

get '/speakers/info' do
  erb :speaker_info
end
