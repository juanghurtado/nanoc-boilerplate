require "yui/compressor"

class YuiJSCompressor < Nanoc3::Filter
  identifier :yuijscompressor

  def run(content, params={})
    compressor = ::YUI::JavaScriptCompressor.new(params)
    compressor.compress(content)
  end
end
