#!/usr/bin/env ruby

require 'rubygems'
require 'uri'
require 'net/http'
require 'json'

base_url = URI.parse "http://search.twitter.com/search.json"
since_id = "206010393146032128"
query = "?q=jrubyconf&result_type=recent&include_entities=1&rpp=100"

1.upto(15) do |page|
  url = base_url.dup
  url.query = query.sub(/^\?/, '') + "&since_id=#{since_id}"

  res = Net::HTTP.get_response(url)
  break unless res.is_a?(Net::HTTPSuccess)
  result = JSON.parse res.body

  break if result['results'].nil? || result['results'].empty?

  filename = "jrubyconf-tweets-#{result['max_id']}-#{'%02d' % page}.json"
  puts "writing #{filename}"
  File.open(filename, "w") do |f|
    f << JSON.pretty_generate(result)
  end

  query = result["next_page"]
  break if query.nil?

  sleep 1
end
