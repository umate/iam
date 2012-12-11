module Rack
  module AssetHelpers
    def html_code
      (css_code << js_code).gsub '\\', '\\\\\\\\'
    end

    private
    def css_code
      "<style type='text/css'>#{typed_asset('stylesheets', 'iam.css')}</style>"
    end

    def js_code
      "<script type='text/javascript'>#{typed_asset('javascripts', 'iam.ujs', 'jquery.cookie.ujs')}</script>"
    end

    def typed_asset(type, *files)
      files.map { |f| asset type, f }.reduce :+
    end

    def asset(type, file)
      @assets ||= {}
      output = ::File.read ::File.join(::File.dirname(__FILE__), '..', '..', 'vendor', 'assets', type, file)
      @assets[file] ||= output
    end
  end
end
