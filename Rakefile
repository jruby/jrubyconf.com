begin
  require 'bundler/setup'
rescue
end

require 'rake/clean'
CLEAN << 'schedule.rb' << 'schedule.xml'

task :server do
  sh 'rackup'
end

file 'schedule.rb' do |t|
  require 'erb'
  erb = ERB.new(File.read('schedule.rb.erb'))
  File.open(t.name, 'w') {|f| f << erb.result(schedule_binding)}
end

file 'schedule.xml' do |t|
  require 'nokogiri'
  require 'open-uri'
  require 'yaml'
  url = YAML.load(File.read('_config.yml'))['schedule_url']
  File.open("schedule.xml", "w") {|f| f.puts(open(url) {|f| Nokogiri::XML(f) }) }
end

task :schedule => ['schedule.xml', 'schedule.rb'] do
end

# END of rake tasks; helper methods below here

module ScheduleData
  def schedule_xml
    @doc ||= begin
               require 'nokogiri'
               File.open('schedule.xml') {|f| Nokogiri::XML(f) }
             end
  end

  def schedule_entries
    @entries ||= [].tap do |entries|
      schedule_xml.xpath('/atom:feed/atom:entry', {'atom' => 'http://www.w3.org/2005/Atom'}).each do |e|
        summary = e.xpath('atom:summary', {'atom' => 'http://www.w3.org/2005/Atom'}).first
        fragment = Nokogiri::HTML.fragment(summary.content)
        nbsp = "\302\240\n"
        nbsp.force_encoding 'UTF-8'
        entry = YAML::load(fragment.children.select {|c| c.text? }.map {|t| t.text.sub(nbsp, ' ') }.join("\n"))
        entry['Title'] = e.xpath('atom:title', {'atom' => 'http://www.w3.org/2005/Atom'}).first.content
        schedule_entry_times(entry)
        entries << entry
      end
    end
  end

  def schedule_entry_times(entry)
    require 'time'
    time_format = '%a %b %d, %Y %I:%M%P %Z'

    times = entry['When']
    zone = times[/ ([A-Z]{3})$/, 1]
    time_start = times.sub(/ to.*$/, '')
    fix_hours_minutes(time_start, zone)
    time_end = times.sub(/\d{1,2}:?\d{0,2}[ap]m to (\d)/, '\1').sub(/.*to /, '').sub(/ [A-Z]{3}$/, '')
    fix_hours_minutes(time_end, zone)
    entry['Start'] = Time.strptime time_start, time_format
    entry['StartTime'] = entry['Start'].strftime('%l:%M%P')
    entry['End'] = Time.strptime time_end, time_format
    entry['EndTime'] = entry['End'].strftime('%l:%M%P')
    entry['Day'] = entry['Start'].strftime('%A')
  rescue
    $stderr.puts entry.inspect
    $stderr.puts time_start unless entry.has_key?('Start')
    $stderr.puts time_end unless entry.has_key?('End')
    raise
  end

  def fix_hours_minutes(time, zone)
    time.sub!(/ (\d{1,2})([ap]m)/, ' \1:00\2')
    time.sub!(/ (\d):/, ' 0\1:')
    time.concat(" #{zone}")
  end

  def schedule_binding
    binding
  end
end

include ScheduleData
