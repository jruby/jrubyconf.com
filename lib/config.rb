module App
  module Config
    RootMappings = {
      "kidscodecamp" => "/news/2012/03/kidscodecamp",
      "railsbridge" => "/news/2012/03/railsbridge"
    }

    # From javascripts/UI.js, look for "new Scene" "container" property
    Scenes = %w(information intro speakers schedule sponsors)
    Scenes.each {|s| RootMappings[s] = "/##{s}"}

    CONFIG_FILE = File.expand_path('../../_config.yml', __FILE__)
    LOCAL_CONFIG_FILE = File.expand_path('../../_config.local.yml', __FILE__)
    CONFIG = YAML.load_file(CONFIG_FILE)
    CONFIG.merge!(YAML.load_file(LOCAL_CONFIG_FILE)) if File.exist?(LOCAL_CONFIG_FILE)

    module_function
    def deploy_revision
      CONFIG['deploy_revision']
    end
  end
end
