/*global Backbone*/
var URL = require('./URL');
var domDef = require('../lib/domains-definition');
var Model = require('./model');
//define a model for a virtual machine
module.exports = Model.extend({
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
	modelName: "virtualMachine",
	//Each domain key much match a model property when given to the template.
	metadatas: {
		//Obtained by generation.
		nbCpu: {
			metadata: domDef.virtualMachine.nbCpu,
			label: "virtualMachine.nbCpu",
			required: false
		},
		osId: {
			metadata: domDef.virtualMachine.osId
		},
		memory: {
			metadata: domDef.virtualMachine.memory
		},
		diskCapacity: {
			metadata: domDef.virtualMachine.diskCapacity
		},
		users: {
			metadata: domDef.virtualMachine.users
		},
		startDate: {
			metadata: domDef.virtualMachine.startDate,
			required: false
		},
		endDate: {
			metadata: domDef.virtualMachine.endDate
		},
		// Override with an other entity domain
		name: {
			metadata: domDef.virtualMachineSearch.name,
			domain: "DO_TEXTE_50",
			label: "virtualMachine.name"
		},
		//Manual override
		os: {
			"domain": "DO_TEXTE_50",
			"required": true,
			"label": "virtualMachine.os"
		}
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