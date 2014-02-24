/*global Backbone, _ */
var DetailView = require('./core/detail-edit-view');
var template = require('./templates/virtualMachine-save');
var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = DetailView.extend({
	template: template,
	getModel: VmSvc.get,
	saveModel:VmSvc.save,

	getRenderData: function getRenderDataEdit() {
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