/*Dependencies on both model and collection class for virtual machine.*/
var VirtualMachine = require('../models/virtualMachine');
var VirtualMachines = require('../models/virtualMachines');
/*Load the promisify helper.*/
var Promisify = require('../models/promisify');
/*Error helper dependency.*/
var ErrorHelper = require('../lib/error_helper');
/*Instances of both model and collection of virtual machines.*/
var virtualMachine = new VirtualMachine();
var promisifyVirtualMachine = new Promisify.Model();
promisifyVirtualMachine.urlRoot = virtualMachine.urlRoot;

var virtualMachines = new VirtualMachines();
var promiseVirtualMachines = new Promisify.Collection();
promiseVirtualMachines.url = virtualMachines.url;


function saveVirtualMachine(model) {
	virtualMachine.clear({
		silent: true
	});
	virtualMachine.save(model.toJSON(), {
		success: function successSaveVirtualMachine(newModel, response) {
			model.trigger('save:success', newModel);
		},
		error: function errorSaveVirtualMachine(newModel, response) {
			model.trigger('save:error', ErrorHelper.manageResponseErrors(response));
		}
	});
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