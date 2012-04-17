module App::Helpers
  def deliver_proposal_emails(proposal)
    submitter_body = erb(:submitter_email, :locals => { :proposal => proposal }, :layout => false)
    from_address = mail_from || proposal.email
    Mail.deliver do
      from    from_address
      to      proposal.email
      subject "Your JRubyConf proposal: #{proposal.title}"
      body    submitter_body
    end

    admin_body = erb(:admin_email, :locals => { :proposal => proposal }, :layout => false)
    admin_address = mail_admin || proposal.email
    Mail.deliver do
      from    from_address
      to      admin_address
      subject "JRubyConf proposal from #{proposal.name}: #{proposal.title}"
      body    admin_body
    end
  end

  def use_ui?
    request.env['PATH_INFO'] == '/' # only on the index page
  end

  def proposal_uri(key)
    "/proposals/edit/#{key}"
  end

  def proposal_url(key)
    request.base_url + proposal_uri(key)
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
        (names[1].length > 10 ? names[0] : names[1])
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
