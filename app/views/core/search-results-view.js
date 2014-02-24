var NotImplementedException = require('../../lib/custom_exception').NotImplementedException;
var _url = require('../../lib/url_helper');

module.exports = Backbone.View.extend({
	tagName: 'div',
	className: 'resultView',

	initialize: function initializeVirtualMachineSearchResult(options) {
		this.listenTo(this.model, "reset", function(){this.render({isSearchTriggered: true})}, this);
	},

	events: {
		'click tbody tr': 'lineSelection'
	},

	lineSelection: function lineSelectionSearchResults(event){
		//throw new NotImplementedException('lineSelection');
		var id = +event.target.parentElement.getAttribute('id');
		//Navigate 
		var url = _url.generateUrl([this.model.model.prototype.modelName, id]);
		//Backbone.Notification.clearNotifications();
		Backbone.history.navigate(url, true);
	},

	render: function renderSearchResults(options) {
		options = options || {};
		//If the research was not launch triggered.
		if(!options.isSearchTriggered){return this;}
		//If there is no result.
		if (this.model.length === 0) {
			//Is recherche launched.
			this.$el.html("<p>No results...</p>");
			Backbone.Notification.addNotification({
					type: 'info',
					message: i18n.t('search.noResult')
				}, true);
		} else {
			//the template must have named property to iterate over it
			this.$el.html(this.template({
				collection: this.model.toJSON()
			}));
		}
		return this;
	}
});