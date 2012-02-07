begin
  require 'bundler/setup'
rescue
end

$:.unshift File.expand_path("../lib", __FILE__)

require 'rake/clean'
CLEAN << 'lib/schedule.rb' << 'schedule.xml'

require 'schedule_data'
include JRubyConf::ScheduleData

file 'lib/schedule.rb' do |t|
  write_schedule_rb(t.name)
end

file 'schedule.xml' do |t|
  write_schedule_xml(t.name)
end

desc "Builds the schedule from GCal"
task :schedule => ['schedule.xml', 'lib/schedule.rb'] do
  if Rake.application.options.trace
    schedule_entries.sort_by {|e| e['Start'] }.each {|e| p e }
  end
end

require 'jekyll_regen'
include JRubyConf::JekyllData

desc "Generate the news posts using Jekyll"
task :generate do
  ruby "-S bundle exec jekyll"
  copy_generated_files('_site', 'public')
end

desc "Runs a development server"
task :server do
  rackup_cmd = %w(-S bundle exec rackup -Ilib)
  rackup_cmd += %w(-s trinidad) if defined?(JRUBY_VERSION)
  ruby *rackup_cmd
end

desc "Runs all pre-deployment tasks"
task :deploy_hook => [:schedule, :generate]

desc "Deploys the site using the engineyard gem"
task :deploy do
  Bundler.with_clean_env do
    sh "ey deploy -e jruby_ci"
  end
end

task :environment do
  require "environment"
end

desc "Run the Cucumber features."
require 'cucumber/rake/task'
Cucumber::Rake::Task.new(:cucumber => [:test_env, "db:migrate"]) do |t|
  t.libs = [File.expand_path('../lib', __FILE__)]
end

task :test_env do
  ENV['RACK_ENV'] = 'test'
  rm_f YAML.load_file("config/database.yml")['test']['database']
end

task :default => :cucumber

namespace :db do
  desc "Create/migrate the database to the latest version."
  task :migrate => :environment do
    ActiveRecord::Migrator.migrate("db/migrate")
  end
end

