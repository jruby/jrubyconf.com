begin
  require 'bundler/setup'
rescue
end

$:.unshift File.expand_path("../lib", __FILE__)

require 'jekyll_regen'
include JRubyConf::JekyllData

desc "Generate the news posts using Jekyll"
task :generate do
  process_site
  copy_generated_files('_site', 'public')
end

desc "Runs a development server"
task :server do
  rackup_cmd = %w(-S bundle exec rackup)
  rackup_cmd += %w(-s trinidad) if defined?(JRUBY_VERSION)
  ruby *rackup_cmd
end

task :environment do
  require "environment"
end

task :test_env do
  ENV['RACK_ENV'] = 'test'
end

begin
  namespace :cucumber do
    require 'cucumber/rake/task'
    task :prereqs => [:test_env]
    libs = [File.expand_path('../lib', __FILE__)]

    desc "Run the @wip features."
    Cucumber::Rake::Task.new(:wip => "cucumber:prereqs") do |t|
      t.libs = libs
      t.cucumber_opts = %w(--wip --tags @wip)
    end

    desc "Run the @smoke features. Use STAGING=url for staging server."
    Cucumber::Rake::Task.new(:smoke) do |t|
      t.libs = libs
      t.cucumber_opts = %w(--tags @smoke)
    end

    desc "Run the stable Cucumber features."
    Cucumber::Rake::Task.new(:stable => "cucumber:prereqs") do |t|
      t.libs = libs
      t.cucumber_opts = %w(--tags ~@wip)
    end

    desc "Run the Cucumber features."
    Cucumber::Rake::Task.new(:all => "cucumber:prereqs") do |t|
      t.libs = libs
    end
  end
  task :cucumber => "cucumber:all"
  task :default => "cucumber:all"
rescue LoadError
  warn "Cucumber not installed; skipping cucumber tasks"
end
