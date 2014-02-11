/* global Backbone, _ , i18n*/
var RefSvc = require('../service/ServiceReferential');

var template = require('./templates/reference');
module.exports = Backbone.View.extend({
	tagName: 'tr',
	template: template,
	/*Good practice fordebugging to name the anonymous function. In order to see it in the stack trace.*/
	initialize: function initializeReferenceView() {
		this.isEdit = false;
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		this.listenTo(this.model, 'save:success', this.saveSuccess);
		this.listenTo(this.model, 'save:error', this.saveError);
	},
	events: {
		"click button#edit": "toogleEditMode",
		"click button[type='submit']": 'save'
	},
	toogleEditMode: function toogleEditMode(event) {
		console.log("toogle");
		event.preventDefault();
		this.isEdit = !this.isEdit;
		this.render();
	},
	save: function saveReferenceChange(event) {
		event.preventDefault();
		this.model.validate();
	},
	saveSuccess: function refSaveSuccess(model) {
		console.log(model);
		Backbone.Notification.addNotification({
			type: 'success',
			message: i18n.t('reference.save.success')
		}, true);
	},
	saveError: function refSaveError(response) {
		console.log('error', response);
		Backbone.Notification.addNotification({
			type: 'error',
			message: i18n.t('reference.save.success')
		}, true);
	},
	//When there is a validation problem, we put the errors into the model in order to display them in the form.
	modelInValid: function refModelInValid(model, errors) {
		this.model.set({
			'errors': errors
		});
		//this.render();
	},

	//When the model is valid, the  process continue.
	modelValid: function refModelValid() {
		this.model.unset('errors', {
			silent: true
		});
		RefSvc.save(this.model);
	},
	render: function renderVirtualMachine() {
		this.$el.html(
			this.template(
				_.extend(
					this.model.toJSON(), {
						isEdit: this.isEdit
					})
			));
		return this;
	}
});