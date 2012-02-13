module App::Helpers
  def deliver_proposal_emails(proposal)
    submitter_body = erb(:submitter_email, :locals => { :proposal => proposal })
    from_address = mail_from
    Mail.deliver do
      from    from_address
      to      proposal.email
      subject "Your JRubyConf proposal: #{proposal.title}"
      body    submitter_body
    end

    admin_body = erb(:admin_email, :locals => { :proposal => proposal })
    admin_address = mail_admin
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
end
