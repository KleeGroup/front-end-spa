/*global Backbone,$*/

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
	sortField: undefined,

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

	setSortField: function setSortField(field){
		this.sortField = field;
	},

	setTotalRecords: function setTotalRecords(totalRecords){
		this.totalRecords = totalRecords;
	}
});