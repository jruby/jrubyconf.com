Dir.chdir(release_path) do
  run 'rake deploy'
end
