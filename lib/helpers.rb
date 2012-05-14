module App::Helpers
  def use_ui?
    request.env['PATH_INFO'] == '/' # only on the index page
  end

  def crazy_id(day, event)
    "#{day.downcase}_#{[event[:speaker_id]].flatten.join('')}_#{event[:time].gsub(' ', '').gsub(':','')}"
  end

  def speaker_names(event)
    [event[:speaker_id]].flatten.map{|s| ::SPEAKERS[s.to_sym] && ::SPEAKERS[s.to_sym][:name]}.compact.join(',<br/>')
  end

  def short_name(event)
    speakers = [event[:speaker_id]].flatten.map(&:to_sym)
    if speakers && speakers != [:jrubyconf]
      speakers.map do |speaker|
        names = ::SPEAKERS[speaker][:name].split
        (names[1..-1].join(' ').length > 10 ? names[0] : names[1..-1].join(' '))
      end.join('/') + ': '
    else
      ''
    end
  end

  def asset_with_revision(asset)
    if deploy_revision
      asset.dup << '?' << deploy_revision
    else
      asset
    end
  end
end
