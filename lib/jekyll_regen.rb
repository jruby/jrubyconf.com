### This section copied from bin/jekyll file
require 'jekyll'

module JRubyConf
  module JekyllRunner
    options = Jekyll.configuration({})
    source      = options['source']
    destination = options['destination']

    # Files to watch
    def self.globs(source)
      Dir.chdir(source) do
        dirs = Dir['*'].select { |x| File.directory?(x) }
        dirs -= ['_site']
        dirs = dirs.map { |x| "#{x}/**/*" }
        dirs += ['*']
      end
    end

    # Create the Site
    @@site = Jekyll::Site.new(options)

    # Watch for updates
    require 'directory_watcher'

    puts "Auto-regenerating enabled: #{source} -> #{destination}"

    @@dw = DirectoryWatcher.new(source)
    @@dw.interval = 1
    @@dw.glob = globs(source)

    @@dw.add_observer do |*args|
      t = Time.now.strftime("%Y-%m-%d %H:%M:%S")
      puts "[#{t}] regeneration: #{args.size} files changed"
      site.process
      Dir["#{destination}"].each do |f|
        FileUtils.cp_r f, f.sub(File.basename(destination), 'public'), :force => true, :verbose => true, :preserve => true
      end
    end

    @@dw.start
  end
end
