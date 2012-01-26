require 'nokogiri'
require 'open-uri'
require 'yaml'
require 'active_support/core_ext/time/zones'

module JRubyConf
  module ScheduleData
    ZONE = 'America/Chicago'

    def write_schedule_rb(name)
      File.open(name, "w") do |f|
        schedule_entries.sort_by {|e| e['Start'] }.each do |entry|
          next if entry['Show'] == false
          f.puts <<-CODE
#{entry['Day'].upcase} << {
  :time        => "#{entry['StartTime']} - #{entry['EndTime']}",
  :title       => #{entry['Title'].inspect},
  :description => #{(entry['Description'] || '').inspect},
  :speaker_id  => #{(entry['Speaker'] || 'jrubyconf').inspect},
  :talk        => #{(entry.has_key?('Talk') ? entry['Talk'] : true).inspect}
}

CODE
        end
      end
    end

    def write_schedule_xml(name)
      url = YAML.load(File.read('_config.yml'))['schedule_url']
      open(url) {|xml| File.open(name, "w") {|f| f.puts(Nokogiri::XML(xml)) } }
    end

    def schedule_xml
      @doc ||= begin
                 File.open('schedule.xml') {|f| Nokogiri::XML(f) }
               end
    end

    def schedule_entries
      @entries ||= [].tap do |entries|
        schedule_xml.xpath('/atom:feed/atom:entry', {'atom' => 'http://www.w3.org/2005/Atom'}).each do |e|
          content = e.xpath('atom:content', {'atom' => 'http://www.w3.org/2005/Atom'}).first
          fragment = Nokogiri::HTML.fragment(content.content)
          nbsp = "\302\240\n"
          nbsp.force_encoding 'UTF-8'
          entry_text = fragment.children.select {|c| c.text? }.map do |t|
            t.text.sub(nbsp, ' ').sub('Event Description: ', '')
          end.join("\n")
          entry = YAML::load(entry_text)
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
      entry['Start'] = Time.strptime(time_start, time_format).in_time_zone(ZONE)
      entry['StartTime'] = entry['Start'].strftime('%l:%M%P')
      entry['End'] = Time.strptime(time_end, time_format).in_time_zone(ZONE)
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
  end
end
