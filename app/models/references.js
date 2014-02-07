/*global Backbone*/
//Module dependencies.
var URL = require('./URL');
var Reference = require('./reference');

//define a collection of references, the model is refernce, but the collection can be use in order to to mass save, update or delete.
module.exports = Backbone.Collection.extend({
	model: Reference,
	url: URL.reference
});