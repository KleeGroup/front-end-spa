/*global Backbone, _ */
var template = require('./templates/virtualMachine');
var VmSvc = require('../service/ServiceVirtualMachine');
var ErrorHelper = require('../lib/error_helper');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	events: {
		"click button#btnEditVm": "edit",
		"click button#btnDelete": "delete"
	},
	initialize: function initializeVirtualMachine() {
		this.model.on('change', this.render, this);
		//this.model.on('sync', this.treatServerResponse, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		this.listenTo(this.model, 'destroy', this.deleteSuccess);
		if (this.model.has('id')) {
			this.model.fetch();
		}
		this.osList = [{
			id: "1",
			label: "Windows 8"
		}, {
			id: "2",
			label: "Linux"
		}, {
			id: "3",
			label: "Mac os X"
		}];
	},
	edit: function editVm(event) {
		event.preventDefault();
		Backbone.history.navigate("updateVirtualMachine/" + this.model.get('id'), true);
	},

	delete: function deleteVm(event) {
		event.preventDefault();
		var model = this;
		//call suppression service
		VmSvc.deleteVm(this.model)
			.then(function(success) {
				model.deleteSuccess(success);
			}, function error(argument) {
				model.deleteError(argument);
			});
	},
	deleteSuccess: function deleteVmSuccess(response) {
		//remove the view from the DOM
		this.remove();
		//navigate to next page
		Backbone.history.navigate("/", true);
	},
	deleteError: function errorVmDelete(errorResponse) {
		console.log('Error', errorResponse);
		ErrorHelper.manageResponseErrors(errorResponse, {
			isDisplay: true
		});
	},
	render: function renderVirtualMachine() {
		var jsonModel = this.model.toJSON();
		_.extend(jsonModel, {
			osList: this.osList
		});
		this.$el.html(this.template(jsonModel));
		return this;
	}
});