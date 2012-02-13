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
  # From javascripts/UI.js, look for "new Scene" "container" property
  scenes = %w(information intro speakers schedule proposals)
  if scenes.include?(scene)
    redirect '/#' + scene
  else
    404
  end
end

get '/proposals/new' do
  erb :proposals_form, :locals => { :proposal => Proposal.new }
end

post '/proposals/save' do
  status = 200

  if params['id'] && !params['id'].empty? # existing proposal
    proposal = Proposal.find params['id']
    status = 404 unless proposal.key == params['key']
  else
    proposal = Proposal.new
    status = 201
    status = 409 if Proposal.exists?(:key => params['key'])
  end

  if status < 400
    %w(name email twitter bio title abstract notes key).each do |attr|
      proposal[attr] = params[attr]
    end
    proposal.save!
    deliver_proposal_emails(proposal) if status == 201 # only on create, not edit
  end

  status status
  erb :proposal_saved, :locals => { :proposal => proposal, :status => status }
end

get '/proposals/edit/:key' do |key|
  halt :not_found unless key.length > 0

  proposal = Proposal.where(:key => key).first
  halt :not_found unless proposal

  erb :proposals_form, :locals => { :proposal => proposal }
end
