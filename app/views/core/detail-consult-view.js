var NotImplementedException = require('../lib/custom_exception').NotImplementedException;
var ErrorHelper = require('../lib/error_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'consultView',
	getModel: undefined,
	deleteModel: undefined,

	initialize: function initializeVirtualMachine() {
		//render view when the model is loaded
		this.model.on('change', this.render, this);
		if (this.model.has('id')) {
			this.getModel(this.model.get('id'))
				.then(this.model.set);
		}
	},

	events: {
		"click button#btnEditVm": "edit",
		"click button#btnDelete": "delete"
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataConsult() {
		throw new NotImplementedException('getRenderData');
	},

	edit: function editVm(event) {
		event.preventDefault();
		Backbone.history.navigate(this.model.modelName + "edit/" + this.model.get('id'), true);
	},

	delete: function deleteVm(event) {
		event.preventDefault();
		var view = this;
		//call suppression service
		this.deleteModel()
			.then(view.deleteSuccess)
			.catch(view.deleteError)

			/*.then(function(success) {
				view.deleteSuccess(success);
			}, function error(argument) {
				view.deleteError(argument);
			});*/
	},

	deleteSuccess: function deleteVmSuccess(response) {
		//remove the view from the DOM
		this.remove();
		//navigate to next page
		Backbone.history.navigate("/", true);
	},

	deleteError: function errorVmDelete(errorResponse) {
		ErrorHelper.manageResponseErrors(errorResponse, {
			isDisplay: true
		});
	},

	render: function renderVirtualMachine() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});