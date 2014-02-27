application = require 'application'
headerItemsData = require('../lib/header_helper').process(require('../lib/site_description').header)
HeaderView = require("../views/header-view")
HeaderItems = require('../models/headerItems');
headerItems = new HeaderItems(headerItemsData)
headerView = new HeaderView({model: headerItems})

module.exports = class AppLayout extends Backbone.Marionette.Layout
  template: 'views/templates/app-layout'
  el: "body"
  regions:
    header: "#header"
    content: "#content"
    footer: "#footer"
  displayHeader:()->
    @header.show(headerView)
  setActiveMenu:(name)->
    headerItems.changeActive(name)

