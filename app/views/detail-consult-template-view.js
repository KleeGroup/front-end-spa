/*global  _ */
var DetailView = require('./core/detail-consult-view');
var template = require('./templates/virtualMachine');
var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = DetailView.extend({
	template: template,
	getModel: VmSvc.get,
	deleteModel: VmSvc.deleteVm,

	getRenderData: function getRenderDataConsult() {
		var jsonModel = this.model.toJSON();
		var osList = [{
			id: "1",
			label: "Windows 8"
		}, {
			id: "2",
			label: "Linux"
		}, {
			id: "3",
			label: "Mac os X"
		}];

		_.extend(jsonModel, {
			osList: osList
		});

		return jsonModel;
	},
});