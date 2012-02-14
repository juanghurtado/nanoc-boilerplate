require 'rake'

usage       'smusher'
aliases     :smusher
summary     'Image size reduction'
description 'Reduce size of images under /output/ through smusher gem'

run do |opts, args, cmd|
  puts '---------------------------------'
  puts '| Smushering files at "/output/*"'
  puts '---------------------------------'
  sh 'smusher output/'
  puts '---------------------------------'
  puts '| Smushering completed!'
  puts '---------------------------------'
end