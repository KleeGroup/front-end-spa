isInitialize = false
exports.load = (options)->
  options = options or {}
  if isInitialize is false
  	global.should = require('chai').should()
  	global.Backbone = require 'backbone'
  	global._ = require 'underscore'
  	global.Promise = require 'bluebird'
  	if options.log?
   	  console.log("# Globals loaded: should, _ , Backbone, Promise")
  	isInitialize = true
  	return true
  else
    console.log('Globals already loaded') if options.log?
    return false