# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
include Nanoc3::Helpers::Capturing
include Nanoc3::Helpers::LinkTo

def rpt(path)
  relative_path_to(path)
end

def layout_img_path(filename)
  relative_path_to("/images/layout/#{filename}")
end

def icon_img_path(filename)
  relative_path_to("/images/icons/#{filename}")
end

def content_img_path(filename)
  relative_path_to("/images/content/#{filename}")
end

def css_path(filename)
  relative_path_to("/css/#{filename}")
end

def js_path(filename)
  relative_path_to("/js/#{filename}")
end

def lorem(wc)
  require 'lorem'
  c = wc.class == Range ? (wc).to_a.shuffle.first : wc
  Lorem::Base.new('words', c).output
end