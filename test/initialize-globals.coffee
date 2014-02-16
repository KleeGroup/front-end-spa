isInitialize = false
exports.load = (options)->
  options = options or {}
  if isInitialize is false
  	global.should = require('chai').should()
  	global.Backbone = require 'backbone'
  	global._ = require 'underscore'
  	if options.log?
   	  console.log("# Globals loaded: should, _ , Backbone ")
  	isInitialize = true
  	return true
  else
    console.log('Globals already loaded') if options.log?
    return false