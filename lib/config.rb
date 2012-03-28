module App
  module Config
    RootMappings = {
      "kidscodecamp" => "/news/2012/03/kidscodecamp",
      "railsbridge" => "/news/2012/03/railsbridge"
    }

    # From javascripts/UI.js, look for "new Scene" "container" property
    Scenes = %w(information intro speakers schedule proposals sponsors)
    Scenes.each {|s| RootMappings[s] = "/##{s}"}

    CONFIG_FILE = File.expand_path('../../_config.yml', __FILE__)
    LOCAL_CONFIG_FILE = File.expand_path('../../_config.local.yml', __FILE__)
    CONFIG = YAML.load_file(CONFIG_FILE)
    CONFIG.merge!(YAML.load_file(LOCAL_CONFIG_FILE)) if File.exist?(LOCAL_CONFIG_FILE)
    SUBMISSION_DEADLINE = CONFIG['submission_deadline']

    module_function

    def mail_from
      if production_site?
        CONFIG['email_from']
      end
    end

    def mail_admin
      if production_site?
        CONFIG['email_admin']
      end
    end

    def production_site?
      CONFIG['production_site']
    end

    def smtp_settings
      @smtp = CONFIG['smtp'] || {}
    end

    def smtp_host
      smtp_settings['host']
    end

    def smtp_port
      smtp_settings['port']
    end

    def smtp_domain
      smtp_settings['domain']
    end

    def smtp_username
      smtp_settings['username']
    end

    def smtp_password
      smtp_settings['password']
    end

    def deploy_revision
      CONFIG['deploy_revision']
    end
  end
end
