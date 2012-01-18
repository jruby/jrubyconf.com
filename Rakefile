begin
  require 'bundler/setup'
rescue
end
require 'rake/clean'

CLEAN << 'schedule.rb'

task :server do
  sh 'rackup'
end

file 'schedule.rb' do |t|
  require 'erb'
  erb = ERB.new(File.read('schedule.rb.erb'))
  File.open(t.name, 'w') {|f| f << erb.result(schedule_binding)}
end

task :schedule => 'schedule.rb' do
  # puts schedule_xml
end

def schedule_xml
  @doc ||= begin
             require 'nokogiri'
             require 'open-uri'
             require 'yaml'
             url = YAML.load(File.read('_config.yml'))['schedule_url']
             open(url) {|f| Nokogiri::XML(f) }
           end
end

def schedule_binding
  binding
end

