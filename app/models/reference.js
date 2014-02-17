//Dependencies
var URL = require('./URL');
var Model = require('./model');
var domDef = require('../lib/domains-definition');
//define a model for a virtual machine
module.exports = Model.extend({
	defaults: {
		id: undefined,
		name: undefined,
		translationKey: undefined
	},
	metadatas: {
		id: {
			metadata: domDef.reference.id
		},
		name: {
			metadata: domDef.reference.name
		},
		translationKey: {
			metadata: domDef.reference.translationKey
		}
	},
	urlRoot: URL.reference,
	/*Initialize the default values which are not defined in the prototype as defaults,
	valid for all the function call as initialization.*/
	initialize: function initializeReference() {},
	validation: {
		name: {
			required: true
		}
	}
});