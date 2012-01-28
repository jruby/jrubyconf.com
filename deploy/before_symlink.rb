run 'rake deploy_hook'
raise "rake deploy_hook failed; blog not generated" unless $?.success?
