var VirtualMachine = require('../models/virtualMachine');
var ErrorHelper = require('../lib/error_helper');
var virtualMachine = new VirtualMachine();

function saveVirtualMachine(model) {
	virtualMachine.clear({
		silent: true
	});
	virtualMachine.save(model.toJSON(), {
		success: function(newModel, response) {
			model.trigger('save:success', newModel);
		},
		error: function(newModel, response) {
			model.trigger('save:error', ErrorHelper.manageResponseErrors(response));
		}
	});
}

function deleteVm(model){
	model.destroy();
}

module.exports = {
	save: saveVirtualMachine,
	deleteVm: deleteVm
};