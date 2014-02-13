var template = require('./templates/test-page');
var VirtualMachines = require('../models/virtualMachines');

module.exports = Backbone.View.extend({
	tagName: 'div',
	template: template,

	initialize: function initializePage(){

		this.model = new VirtualMachines([], {state: {pageSize: 2}});

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

		this.model.fetch({
			reset: true
		});
	},

	render: function render(){
		//the template must have named property to iterate over it
		this.$el.html(this.template({
			collection: this.model.toJSON()
		}));
		$("#grid", this.$el).append(this.grid.render().$el);
		$("#paginator", this.$el).append(this.paginator.render().$el);
		return this;
	}
});