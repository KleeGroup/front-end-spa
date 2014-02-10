/*global Backbone*/
var URL = require('./URL');

//define a model for a virtual machine
module.exports = Backbone.Model.extend({
	defaults: {
		name: undefined,
		nbCpu: undefined,
		memory: undefined,
		diskTypeId: undefined,
		diskCapacity: undefined,
		users: undefined,
		osId: undefined,
		startDate: undefined,
		endDate: undefined
	},

	url: URL.virtualMachine,

	initialize: function initializeVirtualMachine(){
		
		//this.set({startDate: new Date()});
	}
});