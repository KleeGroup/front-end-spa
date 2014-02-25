/*global Backbone,$*/

module.exports = Backbone.Collection.extend({
	firstPage: 0,
	currentPage: 0,
	perPage: 3,
	totalPages: 10,

	paginator_core: {
		// the type of the request (GET by default)
		type: 'GET',

		// the type of reply (jsonp by default)
		dataType: 'jsonp',

		// the URL (or base URL) for the service
		// if you want to have a more dynamic URL, you can make this a function
		// that returns a string
		url: 'http://localhost/Catalog/People(49446)/TitlesActedIn?'
	},

	paginator_ui: {
		// the lowest page index your API allows to be accessed
		firstPage: 0,

		// which page should the paginator start from
		// (also, the actual page the paginator is on)
		currentPage: 0,

		// how many items per page should be shown
		perPage: 3,

		// a default number of total pages to query in case the API or
		// service you are using does not support providing the total
		// number of pages for us.
		// 10 as a default in case your service doesn't return the total
		totalPages: 10
	},

	server_api: {
		// the query field in the request
		'$filter': '',

		// number of items to return per request/page
		'$top': function() {
			return this.perPage
		},

		// how many results the request should skip ahead to
		// customize as needed. For the Netflix API, skipping ahead based on
		// page * number of results per page was necessary.
		'$skip': function() {
			return this.currentPage * this.perPage
		},

		// field to sort by
		'$orderby': 'ReleaseYear',

		// what format would you like to request results in?
		'$format': 'json',

		// custom parameters
		'$inlinecount': 'allpages',
		'$callback': 'callback'
	},

	parse: function parse(response) {
		//must return totalrecords
	},

	pageInfo: function pageInfo(){
		var info = {
			// If parse() method is implemented and totalRecords is set to the length
			// of the records returned, make it available. Else, default it to 0
			totalRecords: this.totalRecords || 0,
			currentPage: this.currentPage,
			firstPage: this.firstPage,
			totalPages: Math.ceil(this.totalRecords / this.perPage),
			lastPage: this.totalPages, // should use totalPages in template
			perPage: this.perPage,
			previous: false,
			next: false
		};

		if (this.currentPage > 1) {
			info.previous = this.currentPage - 1;
		}

		if (this.currentPage < info.totalPages) {
			info.next = this.currentPage + 1;
		}

		// left around for backwards compatibility
		info.hasNext = info.next;
		info.hasPrevious = info.next;

		info.pageSet = this.setPagination(info);

		this.information = info;
		return info;
	}

	compileOptions: function compileOptions(options) {
		var self = this;
		// Some values could be functions, let's make sure
		// to change their scope too and run them
		var queryAttributes = {};
		_.each(_.result(self, "server_api"), function(value, key) {
			if (_.isFunction(value)) {
				value = _.bind(value, self);
				value = value();
			}
			queryAttributes[key] = value;
		});

		var queryOptions = _.clone(self.paginator_core);
		_.each(queryOptions, function(value, key) {
			if (_.isFunction(value)) {
				value = _.bind(value, self);
				value = value();
			}
			queryOptions[key] = value;
		});

		// Create default values if no others are specified
		queryOptions = _.defaults(queryOptions, {
			timeout: 25000,
			cache: false,
			type: 'GET',
			dataType: 'jsonp'
		});

		// Allows the passing in of {data: {foo: 'bar'}} at request time to overwrite server_api defaults
		if (options.data) {
			options.data = decodeURIComponent($.param(_.extend(queryAttributes, options.data)));
		} else {
			options.data = decodeURIComponent($.param(queryAttributes));
		}

		queryOptions = _.extend(queryOptions, {
			data: decodeURIComponent($.param(queryAttributes)),
			processData: false,
			url: _.result(queryOptions, 'url')
		}, options);

		return queryOptions;
	}
});