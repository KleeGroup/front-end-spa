/*global Backbone*/
var HeaderItem = require('./headerItem');
module.exports = Backbone.Collection.extend({
  model: HeaderItem,
  changeActive: function changeActiveHeader(name){
    if(name !== undefined){
      var current = this.findWhere({active: "active"});
      var newActive = this.findWhere({name: name});
      /*Check if there is a change*/
      if(current !== undefined && newActive !== undefined && current.get('name') !== newActive.get('name')){
        current.set({active: ""});
        newActive.set({active: "active"});
      }
    }
  }
});