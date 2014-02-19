module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'searchView',

	initialize: function initializeSearch(options){
		this.searchResult = initResultView()
	},

	initResultView: function initResultView(){

	}

	renderTemplate: function renderTemplate(){
		throw new Error('');
	},

	render: function renderSearch(){
		this.$el.html(this.renderTemplate());
		return this;
	}
});