require File.expand_path('../../../lib/config', __FILE__)

module Jekyll
  class AssetRevisionTag < Liquid::Tag
    def render(context)
      if App::Config.deploy_revision
        "?#{App::Config.deploy_revision}"
      else
        ""
      end
    end
  end
end

Liquid::Template.register_tag('asset_revision', Jekyll::AssetRevisionTag)
