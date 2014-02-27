/*global _, Promise*/
//Dependencies.
var SearchView = require('../core/search-view');
//var ResultsView = require('./pret-result-view');
var template = require('../templates/nantissement/pret-search');
var PretCriteria = require('../../models/nantissement/pret');
var Prets = require('../../models/nantissement/prets');
var RefHelper = require('../../lib/reference_helper');
//var PretSvc = require('../nantissement/ServicePret');

//Define the search view for the prets.
module.exports = SearchView.extend({
  Results: Prets,
  //search: PretSvc.search,
  template: template,
  //list all the references to load.
  referenceNames: [{name: "ols", url: "http://localhost:8080/CIL"}, {name: "cil", url: "http://localhost:8080/CIL"}, {name: "cil2", url: "http://localhost:8080/CIL"}],
  //ResultsView: ResultsView,
  initialize: function initializePretCriteria(){
    this.model = this.model || new PretCriteria();
    this.listenTo(this.model, 'change', this.render);
    var currentView = this;
    Promise.all(RefHelper.loadMany(this.referenceNames)).then(function(results) {
      var res = {};
      for(var i =0, l= results.length;  i < l ; i++){
        res[currentView.referenceNames[i].name] = results[i];
      }
      currentView.model.set(res);
      currentView.isReady = true;
    }).catch(function(e) {
        console.error("error when getting your stuff", e);
    });
  },
  getRenderData: function getRenderDataSearch() {
    return this.model.toJSON();
  },
  render: function renderSearchView(){
    this.$el.html(this.template(_.extend({isMoreCriteria: this.isMoreCriteria},this.getRenderData())));
  }
});