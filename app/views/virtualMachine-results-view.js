/*global Backbone, $*/
var template = require('./templates/virtualMachine-results');
var _url = require('../lib/url_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializeSearchResult() {

		var columns = [{
			name: "id",
			editable: false,
			cell: Backgrid.IntegerCell.extend({
				orderSeparator: ''
			})
		}, {
			name: "name",
			cell: "string"
		}, {
			name: "nbCpu",
			cell: "integer"
		}, {
			name: "memory",
			cell: "number"
		}];

		this.grid = new Backgrid.Grid({
			columns: columns,
			collection: this.model
		});

		this.paginator = new Backgrid.Extension.Paginator({
			collection: this.model
		});
	},

	events: {
		'click tbody tr': 'virtualMachineSelection'
	},

	render: function renderVirtualMachineResults() {
		//the template must have named property to iterate over it
		this.$el.html(this.template({
			collection: this.model.toJSON()
		}));
		$("#grid", this.$el).append(this.grid.render().$el);
		$("#paginator", this.$el).append(this.paginator.render().$el);
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