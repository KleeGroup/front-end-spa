var VirtualMachine = require('../models/virtualMachine');
var virtualMachine = new VirtualMachine();

function saveVirtualMachine(model) {
	virtualMachine.clear({
		silent: true
	});
	virtualMachine.save(model.toJSON(), {
		success: function(newModel, response) {
			model.trigger('save:success', newModel);
		},
		error: function(model, response) {
			model.trigger('save:error', response);
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