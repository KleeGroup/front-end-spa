/*Dependencies on both model and collection class for virtual machine.*/
var VirtualMachine = require('../models/virtualMachine');
var VirtualMachines = require('../models/virtualMachines');
/*Load the promisify helper.*/
var Promisify = require('../models/promisify');
/*Instances of both model and collection of virtual machines.*/
var promisifyVirtualMachine = Promisify.Convert.Model(new VirtualMachine());
var promiseVirtualMachines = Promisify.Convert.Collection(new VirtualMachines());//new Promisify.Collection();

//Try to save a virtual machine, returning a promise.
function saveVirtualMachine(jsonModel) {
	promisifyVirtualMachine.clear({silent: true});
	promisifyVirtualMachine.set(jsonModel, {silent: true});
	return promisifyVirtualMachine.save();
}

//Try to delete a virtual machine and return a promise.
function deleteVm(jsonModel) {
	promisifyVirtualMachine.clear({silent: true});
	promisifyVirtualMachine.set(jsonModel, {silent: true});
	return promisifyVirtualMachine.destroy();
}

// Seach for a virtual machine, using a criteria into the request. And return a promise.
function searchVirtualMachine(criteria) {
	promiseVirtualMachines.reset(null, {silent: true});
	if(criteria === undefined){
		return promiseVirtualMachines.fetch();
	} return  promiseVirtualMachines.fetch({data: criteria});
}


module.exports = {
	save: saveVirtualMachine,
	deleteVm: deleteVm,
	search: searchVirtualMachine
};