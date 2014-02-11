var VirtualMachine = require('./virtualMachine');

//define a criteria for a virtual machines search
//inherit of all property of a virtual machine
module.exports = VirtualMachine.extend({
	//Override the application validation, in order to not block the search.
	validation: {}
});