/*global Backbone,$*/
var ArgumentInvalidException = require('../../lib/custom_exception').ArgumentInvalidException;

module.exports = Backbone.Collection.extend({
	//first number of page
	firstPage: 0,
	//the page loaded
	currentPage: 0,
	// number of records par page
	perPage: 3,
	// total number og pages. default initialization
	totalPages: 10,
	//sort fields
	sortField: {},

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
			next: false,
			sortField: this.sortField
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

		this.information = info;
		return info;
	},

	setPage: function setPage(page){
		page = page || 0;  
		this.currentPage = page;
	},

	setNextPage: function setNextPage(){
		//TODO : controller si pas de page suivante
		this.currentPage++;
	},

	setPreviousPage: function setPreviousPage(){
		//TODO: controller si pas de page précedente
		this.currentPage--;
	},

	setSortField: function setSortField(field, order){
		order = order || "asc";
		if(field === undefined || (order !== "asc" && order !== "desc")){
			throw new ArgumentInvalidException("sort arguments invalid");
		}
		this.sortField = {
			field: field,
			order: order
		};

		this.currentPage = this.firstPage;
	},

	setTotalRecords: function setTotalRecords(totalRecords){
		this.totalRecords = totalRecords;
	}
});