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

file '_news/news/schedule.markdown' => 'lib/schedule.rb' do |t|
  load './lib/data.rb'
  write_schedule_md(t.name)
end

desc "Builds the schedule from GCal"
task :schedule => ['schedule.xml', 'lib/schedule.rb', '_news/news/schedule.markdown'] do
  if Rake.application.options.trace
    schedule_entries.sort_by {|e| e['Start'] }.each {|e| p e }
  end
end

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

desc "Runs all pre-deployment tasks"
task :deploy_hook => [:schedule, :generate, :mail_connectivity]

desc "Deploys the site using the engineyard gem"
task :deploy do
  Bundler.with_clean_env do
    sh "ey deploy --environment=jruby_ci --app=jrubyconf --ref=master --migrate"
  end
end

task :environment do
  require "environment"
end

task :test_env do
  ENV['RACK_ENV'] = 'test'
  rm_f YAML.load_file("config/database.yml")['test']['database']
end

begin
  namespace :cucumber do
    require 'cucumber/rake/task'
    task :prereqs => [:test_env, "db:migrate", :deploy_hook]
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

namespace :db do
  desc "Create/migrate the database to the latest version."
  task :migrate => :environment do
    ActiveRecord::Migrator.migrate("db/migrate")
  end
end

task :mail_connectivity => :environment do
  require 'net/smtp'
  include App::Config
  smtp = Net::SMTP.new(smtp_host, smtp_port)
  smtp.enable_starttls_auto
  smtp.start(smtp_domain, smtp_username, smtp_password, 'plain') do |smtp_obj|
    print "=+= Checking SMTP config: "
    smtp_obj.instance_eval { p @capabilities }
  end
end
