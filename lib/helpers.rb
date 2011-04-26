include Nanoc3::Helpers::Capturing
include Nanoc3::Helpers::LinkTo

def rpt(path)
  relative_path_to(path)
end

def layout_img(filename)
  relative_path_to("/images/layout/#{filename}")
end

def icons_img(filename)
  relative_path_to("/images/icons/#{filename}")
end

def content_img(filename)
  relative_path_to("/images/content/#{filename}")
end

def css(filename)
  relative_path_to("/css/#{filename}")
end

def js(filename)
  relative_path_to("/js/#{filename}")
end