class DbConnectionManagement
  def initialize(app)
    @app = app
  end

  def call(env)
    begin
      @app.call(env)
    ensure
      ActiveRecord::Base.clear_reloadable_connections!
      ActiveRecord::Base.clear_cache!
    end
  end
end

# Implement the following rules:
# * / => /index.html
# * RewriteRule ([^.]+)$ $1.html
class DotHtmlRewriter
  include Sinatra::Helpers
  attr_reader :request, :response, :env

  def initialize(app)
    @app = app
  end

  def halt(*response)
    response = response.first if response.length == 1
    throw :halt, response
  end

  def call(env)
    result = catch(:halt) do
      env["PATH_INFO"] += "index.html" if env["PATH_INFO"] =~ /\/$/

      result = @app.call(env)
      halt result if result[0] != 404

      location = "/"

      if env["PATH_INFO"] =~ %r{/[^./]+$}
        env["PATH_INFO"] += ".html"
        result = @app.call(env)
        halt result if result[0] != 404
        location = env["PATH_INFO"].sub(/.html$/, '/')
      end

      dup.redirect_to(env, location)
    end

    if result.respond_to?(:finish)
      result.finish
    else
      result
    end
  end

  def redirect_to(env, location)
    @env = env
    @request = Sinatra::Request.new(env)
    @response = Sinatra::Response.new
    redirect location, @response
  end
end
