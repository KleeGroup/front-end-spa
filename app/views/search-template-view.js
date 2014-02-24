var SearchView = require('./core/search-view');
var ResultsView = require('./results-template-view');
var template = require('./templates/virtualMachine-search');
var VirtualMachines = require('../models/virtualMachines');
var VirtualMachineResultsView = require("./virtualMachine-results-view");
var VmSvc = require('../service/ServiceVirtualMachine');

module.exports = searchView =  SearchView.extend({
	Results: VirtualMachines,
	search: VmSvc.search,
	template: template,
	ResultsView: ResultsView,
	
	getRenderData: function getRenderDataSearch() {
		return this.model.toJSON();
	}
});