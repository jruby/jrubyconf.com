run 'rake deploy'
raise "rake deploy failed; blog not generated" unless $?.success?
