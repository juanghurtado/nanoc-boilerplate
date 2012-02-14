require 'rake'

usage       'minify'
aliases     :minify
summary     'CSS/JS minification'
description 'Reduce size of CSS and JS files under /output/ through YUI Compressor'

run do |opts, args, cmd|
  puts '------------------------------------'
  puts '| Minifying CSS files at "/output/*"'
  puts '------------------------------------'
  sh "find output/css -name '*.css' -exec java -jar ./bin/yuicompressor-2.4.7.jar --type css '{}' -o '{}-min.css' \\;"
  puts '------------------------------------'
  puts '| Minifying CSS completed!'
  puts '------------------------------------'

  puts '------------------------------------'
  puts '| Minifying JS files at "/output/*"'
  puts '------------------------------------'
  sh "find output/js -name '*.js' -exec java -jar ./bin/yuicompressor-2.4.7.jar --type js '{}' -o '{}-min.js' \\;"
  puts '------------------------------------'
  puts '| Minifying JS completed!'
  puts '------------------------------------'
end