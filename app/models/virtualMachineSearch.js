var VirtualMachine = require('./virtualMachine');

/*
  Define a criteria for a virtual machines search
  inherit of all property of a virtual machine with
  the extend method which is inherit by the Backbone.Model
*/
module.exports = VirtualMachine.extend({
	//Override the application validation.
	//If we have a required criteria in the search object it would be defined here.
	validation: {}
});