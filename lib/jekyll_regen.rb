### This section copied from bin/jekyll file
require 'jekyll'

module JRubyConf
  module JekyllData
    def process_site
      Dir.chdir(File.expand_path('../..', __FILE__)) do
        if ! File.exist?('_news/_includes/footer.html') ||
            File.mtime('views/footer.html.erb') > File.mtime('_news/_includes/footer.html')
          FileUtils.cp 'views/footer.html.erb', '_news/_includes/footer.html', :verbose => true
        end
      end
      JekyllRunner.site.process
    end

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

    def self.options
      @options ||= Jekyll.configuration({})
    end

    def self.source
      @source = options['source']
    end

    def self.destination
      @destination = options['destination']
    end

    def self.site
      @site ||= Jekyll::Site.new(options)
    end

    def self.main
      puts "Auto-regenerating enabled: #{source} -> #{destination}"

      require 'directory_watcher'
      @dw = DirectoryWatcher.new(source)
      @dw.interval = 1
      @dw.glob = globs(source)

      @dw.add_observer do |*args|
        t = Time.now.strftime("%Y-%m-%d %H:%M:%S")
        puts "[#{t}] regeneration: #{args.size} files changed"
        process_site
        copy_generated_files(destination, 'public')
      end

      @dw.start
    end
  end
end
