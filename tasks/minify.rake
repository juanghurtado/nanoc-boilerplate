desc 'Minify all JS and CSS files at /output/'
task :minify do
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