$:.unshift(File.dirname(__FILE__)).uniq!

require 'main'
run Sinatra::Application