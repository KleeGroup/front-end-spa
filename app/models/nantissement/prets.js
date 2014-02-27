/*global Backbone*/
//Dependencies.
var URL = require('../URL');
var Pret = require('./pret');

//define a collection of prets
module.exports = Backbone.Collection.extend({
  //A collection only need a model property in order to _Type_ each element of the collection.
  model: Pret,
  /*
    The url will  be use in order to do all the [CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
    operations on the model with the **REST** api. All operations will only exchange json between client and server.
   */
  url: URL.nantissement.virtualMachine
});