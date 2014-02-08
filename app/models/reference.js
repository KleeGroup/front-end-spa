/*global Backbone*/
var URL = require('./URL');

//define a model for a virtual machine
module.exports = Backbone.Model.extend({
	defaults: {
		id: undefined,
		name: undefined,
		translationKey: undefined
	},

	url: URL.reference,
	/*Initialize the default values which are not defined in the prototype as defaults,
	valid for all the function call as initialization.*/
	initialize: function initializeReference() {}
});