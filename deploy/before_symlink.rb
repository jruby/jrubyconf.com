on_app_servers_and_utilities do
  if File.exist?(File.join(shared_path, 'config', 'smtp.yml'))
    require 'yaml'
    smtp_config = YAML.load_file(File.join(shared_path, 'config', 'smtp.yml'))

    domain = node['engineyard']['environment']['apps'].first['vhosts'].first['domain_name'] rescue "_"
    # Set the production site flag only for the app with the jrubyconf.com domain
    if domain == 'www.jrubyconf.com'
      smtp_config = smtp_config.merge "production_site" => true
    else
      domain = node['engineyard']['environment']['instances'].first['public_hostname'] rescue "_"
    end
    smtp_config['smtp']['domain'] = domain

    local_config = File.join(release_path, "_config.local.yml")
    puts "=+= Writing file: #{local_config} for domain #{domain}"
    File.open(local_config, "w") do |f|
      f << YAML::dump(smtp_config)
    end
  end

  run 'rake deploy_hook'
  raise "rake deploy_hook failed; blog not generated" unless $?.success?
end
