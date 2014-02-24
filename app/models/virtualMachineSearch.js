var VirtualMachine = require('./virtualMachine');

/*
  Define a criteria for a virtual machines search
  inherit of all property of a virtual machine with
  the extend method which is inherit by the Backbone.Model
*/
var domDef = require('../lib/domains-definition');

module.exports = VirtualMachine.extend({
	//Override the application validation.
	//If we have a required criteria in the search object it would be defined here.
	validation: {},

	metadatas: {	
		startDate: {
			metadata: domDef.virtualMachine.startDate,
			required: false
		},
		// Override with an other entity domain
		name: {
			metadata: domDef.virtualMachineSearch.name,
			domain: "DO_TEXTE_50",
			label: "virtualMachine.name"
		},
	},
});