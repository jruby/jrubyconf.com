### This section copied from bin/jekyll file
require 'jekyll'

module JRubyConf
  module JekyllData
    def copy_generated_files(generated, destination)
      files = Dir["#{generated}/**/*"].to_a
      root  = generated.sub %r{[^/]+$}, destination

      files.each do |f|
        begin
          copy = f.sub /^#{generated}/, root

          if File.directory?(f)
            FileUtils.mkdir_p copy, :verbose => true
          else
            FileUtils.cp_r f, copy, :verbose => true
          end
        rescue
          puts $!, *$!.backtrace
        end
      end
    end
  end

  module JekyllRunner
    extend JekyllData

    # Files to watch
    def self.globs(source)
      Dir.chdir(source) do
        dirs = Dir['*'].select { |x| File.directory?(x) }
        dirs -= ['_site']
        dirs = dirs.map { |x| "#{x}/**/*" }
        dirs += ['*']
      end
    end

    def self.main
      options = Jekyll.configuration({})
      source      = options['source']
      destination = options['destination']

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
        @@site.process
        copy_generated_files(destination, 'public')
      end

      @@dw.start
    end
  end
end
