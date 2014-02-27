/*global Backbone*/
module.exports = Backbone.Model.extend({
  defaults: {
    cssId: "",
    cssClass: "",
    dataAttributes: "",
    active: "",
    name: undefined,
    transalationKey: "",
    url:"#nav"
  }
});