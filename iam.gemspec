# encoding: utf-8
require File.expand_path('../lib/iam/version', __FILE__)

Gem::Specification.new do |s|
  s.name        = 'iam'
  s.version     = Iam::VERSION
  s.platform    = Gem::Platform::RUBY
  s.license     = 'MIT'
  s.author      = 'Yury Kaliada'
  s.email       = 'fut.wrk@gmail.com'
  s.description = 'Simple account switcher for Rails that automatically retrieves a few user accounts for each role and provides single-click login feature.'
  s.homepage    = 'http://github.com/FUT/iam'
  s.summary     = 'Simple account switcher for Rails.'

  s.files        = Dir['{lib,config,spec}/**/*', '[A-Z]*', 'init.rb'] - ['Gemfile.lock']
  s.require_path = 'lib'

  s.add_dependency 'activesupport', '~> 3.1'
  s.add_dependency 'coffee-rails', '~> 3.2.1'
  s.add_dependency 'sass'
  s.add_dependency 'devise'

  s.add_development_dependency 'rails', '~> 3.1'
  s.add_development_dependency 'rspec-rails', '~> 2.10'

  s.rubyforge_project = s.name
end
