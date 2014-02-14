/*global Backbone, _, $, i18n*/
var template = require('./templates/virtualMachine-save');
var form_helper = require('../lib/form_helper');
var VmSvc = require('../service/ServiceVirtualMachine');
var _url = require('../lib/url_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	events: {
		"click button[type='submit']": "save",
		"click button#btnCancel": "cancelEdition",
	},
	initialize: function initializeVirtualMachine() {
		this.model.on('change', this.render, this);
		//this.model.on('sync', this.treatServerResponse, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
		this.listenTo(this.model, 'save:success', this.saveSuccess);
		this.listenTo(this.model, 'save:error', this.saveError);
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
	save: function saveVm(event) {
		event.preventDefault();
		form_helper.formModelBinder({
			inputs: $('input', this.$el) //, options: $('')
		}, this.model);
		this.model.validate();

	},
	saveSuccess: function saveSuccess(model) {
		Backbone.Notification.addNotification({
			type: 'success',
			message: i18n.t('virtualMachine.save.' + (this.model.get('isCreate') ? 'create' : 'update') + 'success')
		});
		Backbone.history.navigate('virtualMachine/' + model.get('id'), true);
		//console.log('succeess', model);
	},
	saveError: function saveError(errors) {
		console.log('error', errors);
		this.model.set({
			'errors': errors.fieldErrors
		});
		_.each(errors.globalErrors, function(error) {
			Backbone.Notification.addNotification({
				type: 'error',
				message: error
			},true);
		})
	},
	//When there is a validation problem, we put the errors into the model in order to display them in the form.
	modelInValid: function vmModelInValid(model, errors) {
		this.model.set({
			'errors': errors
		});
		//this.render();
	},

	//When the model is valid, the  process continue.
	modelValid: function vmModelValid() {
		this.model.unset('errors', {
			silent: true
		});
		VmSvc.save(this.model);
	},

	cancelEdition: function cancelEdition(){
		var url = _url.generateUrl(["virtualMachine", this.model.get("id")], {});
		Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
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