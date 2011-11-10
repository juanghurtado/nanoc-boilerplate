require "yui/compressor"

class YuiCSSCompressor < Nanoc3::Filter
  identifier :yuicsscompressor

  def run(content, params={})
    compressor = ::YUI::CssCompressor.new(params)
    compressor.compress(content)
  end
end
