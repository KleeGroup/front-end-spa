/*global Backbone, _, $, i18n*/
var form_helper = require('../lib/form_helper');
var _url = require('../lib/url_helper');
var ErrorHelper = require('../lib/error_helper');
var ModelValidator = require('../lib/model-validation-promise');

//var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'editView',
	save: undefined, //VmSvc.save
	get: undefined, //VmSvc.get

	initialize: function initializeEdit() {
		this.model.on('change', this.render, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		if (this.model.has('id')) {
			var view = this;
			this.getModel(this.model.get('id'))
				.then(function success(jsonModel){
					view.model.set(jsonModel);
				});
		}
	},

	//JSON data to attach to the template.
	getRenderData: function getRenderDataEdit() {
		throw new NotImplementedException('getRenderData');
	},

	save: function saveEdit(event) {
		event.preventDefault();
		form_helper.formModelBinder({
			inputs: $('input', this.$el)
		}, this.model);

		var currentView = this;
		ModelValidator.validate(currentView.model)
			.catch (function error(errors){
				currentView.model.setErrors(errors);
			})
			.then(function() {
				currentView.model.unsetErrors();
				currentView.save(currentView.model.toJSON())
					.then(function success(jsonModel){
						currentView.saveSuccess(jsonModel);
					})
					.catch (function error(responseError){
						currentView.saveError(responseError);
					});
			});
	},

	//Actions on save success.
	saveSuccess: function saveSuccess(jsonModel) {
		Backbone.Notification.addNotification({
			type: 'success',
			message: i18n.t('virtualMachine.save.' + (jsonModel.isCreate ? 'create' : 'update') + 'success')
		});
		var url = generateNavigationUrl();
		Backbone.history.navigate(url, true);
	},

	//Actions on save error
	saveError: function saveError(errors) {
		ErrorHelper.manageResponseErrors(errors, {
			model: this.model
		});
	},

	generateNavigationUrl: function generateNavigationUrl(){
		return _url.generateUrl(["virtualMachine", this.model.get("id")], {});
	} 

	cancelEdition: function cancelEdition() {
		var url = generateNavigationUrl();
		Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	},

	render: function renderEdit() {
		var jsonModel = this.getRenderData();
		this.$el.html(this.template(jsonModel));
		return this;
	}
});