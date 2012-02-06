source :rubygems

gem 'sinatra'
gem 'sinatra-contrib'
gem 'tzinfo'
gem 'activesupport'
gem 'activerecord'

gem 'rake'
gem 'jekyll'
gem 'kramdown'
gem 'coderay'
gem 'nokogiri'

gem 'jruby-openssl', :platform => 'jruby'
gem 'trinidad', :platform => 'jruby'

group :production do
  gem 'pg', :platforms => :ruby
  gem 'activerecord-jdbcpostgresql-adapter', :platforms => :jruby
end

group :test, :development do
  gem 'sqlite3', :platforms => :ruby
  gem 'activerecord-jdbcsqlite3-adapter', :platforms => :jruby
  gem 'cucumber'
  gem 'rspec'
  gem 'cucumber-sinatra'
  gem 'capybara'
  gem 'capybara-webkit'
end
