/*global Backbone*/
var template = require('./templates/virtualMachine-results');
var _url = require('../lib/url_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	events: {
		'click tbody tr': 'virtualMachineSelection'
	},

	render: function renderVirtualMachineResults() {
		//the template must have named property to iterate over it
		this.$el.html(this.template({
			collection: this.model.toJSON()
		}));
		return this;
	},

	virtualMachineSelection: function virtualMachineSelection(event) {
		var id = +event.target.parentElement.getAttribute('id');
		//Navigate 
		var url = _url.generateUrl(['virtualMachine', id]);
		//Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	}
});