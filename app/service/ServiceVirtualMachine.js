/*Dependencies on both model and collection class for virtual machine.*/
var VirtualMachine = require('../models/virtualMachine');
var VirtualMachines = require('../models/virtualMachines');
/*Load the promisify helper.*/
var Promisify = require('../models/promisify');
/*Instances of both model and collection of virtual machines.*/
var promisifyVirtualMachine = Promisify.Convert.Model(new VirtualMachine());
var promiseVirtualMachines = Promisify.Convert.Collection(new VirtualMachines());//new Promisify.Collection();
var OdataHelper = require('../lib/odata_helper');

//try to get a virtualMachine by id, returning a promise.
function getVirtualMachine(id){
	promisifyVirtualMachine.clear({silent: true});
	promisifyVirtualMachine.set(id, {silent: true});
	return promisifyVirtualMachine.fetch();
}

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
function searchVirtualMachine(criteria, pagesInfo) {
	promiseVirtualMachines.reset(null, {silent: true});
	var options = OdataHelper.createOdataOptions(criteria, pagesInfo);
	return  promiseVirtualMachines.fetch(options).then(OdataHelper.parseOdataResponse);
}

module.exports = {
	get: getVirtualMachine,
	save: saveVirtualMachine,
	deleteVm: deleteVm,
	search: searchVirtualMachine
};