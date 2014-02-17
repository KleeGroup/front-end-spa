/*global Backbone*/
var URL = require('./URL');
var domDef = require('../lib/domains-definitions');
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
	//Each domain key much match a model property when given to the template.
	domains: {
		//Obtained by generation.
		nbCpu: domDef.virtualMachine.nbCpu,
		osId: domDef.virtualMachine.osId,
		memory: domDef.virtualMachine.memory,
		diskCapacity: domDef.virtualMachine.diskCapacity,
		users: domDef.virtualMachine.users,
		startDate: domDef.virtualMachine.startDate,
		endDate: domDef.virtualMachine.endDate,
		// Override with an other entity domain
		name: domDef.virtualMachineSearch.name,
		//Manual override
		os: {
			"domain": "DO_TEXTE_50",
			"required": true
		}
	},
	//Each label key much match a domain key.
	labels: {
		//Obtain by generation
		nbCpu: "virtualMachine.nbCpu",
		memory: "virtualMachine.memory",
		diskTypeId: "virtualMachine.diskTypeId",
		diskCapacity: "virtualMachine.diskCapacity",
		users: "virtualMachine.users",
		osId: "virtualMachine.osId",
		startDate: "virtualMachine.startDate",
		endDate: "virtualMachine.endDate",
		//Override with an other translation key.
		name: "virtualMachineSearch.name"
	},
	validation: {
		name: {
			required: true
		},
		nbCpu: {
			required: true
		},
		memory: {
			required: true
		},
		diskTypeId: {
		//	required: true
		},
		diskCapacity: {
			required: true
		},
		users: {
			required: true
		},
		osId: {
			//required: true
		},
		startDate: {
			required: true
		},
		endDate: {
			required: true
		}
	},
	urlRoot: URL.virtualMachine,

	initialize: function initializeVirtualMachine() {

		//this.set({startDate: new Date()});
	}
});