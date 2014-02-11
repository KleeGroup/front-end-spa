/*global Backbone, _, $*/
var template = require('./templates/virtualMachine');
var form_helper = require('../lib/form_helper');
module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,
	events: {
		"click button#btnEditVm": "edit",
	},
	initialize: function initializeVirtualMachine() {
		this.model.on('change', this.render, this);
		//this.model.on('sync', this.treatServerResponse, this);
		this.listenTo(this.model, 'validated:valid', this.modelValid);
		this.listenTo(this.model, 'validated:invalid', this.modelInValid);
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

	render: function renderVirtualMachine() {
		var jsonModel = this.model.toJSON();
		_.extend(jsonModel, {
			osList: this.osList
		});
		this.$el.html(this.template(jsonModel));
		return this;
	}
});