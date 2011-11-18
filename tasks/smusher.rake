desc 'Compress all images at /output/'
task :smusher do
  puts '---------------------------------'
  puts '| Smushering files at "/output/*"'
  puts '---------------------------------'
  sh 'smusher output/'
  puts '---------------------------------'
  puts '| Smushering completed!'
  puts '---------------------------------'
end