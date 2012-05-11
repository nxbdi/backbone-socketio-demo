// Filename: router.js
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'views/home/main',
  'views/search/main',
  'views/search/input'

], function($, _, Backbone,
  MainHomeView,
  searchResults,
  searchInput
  ){

  new searchInput().render()

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'search/:term': 'searchResults',

      // Default
      '*actions': 'defaultAction'
    },

    showView: function(view) {
      view.render().el
    },

    searchResults: function (term) {
      new searchResults({ term: term }).render()
    },

    defaultAction: function(actions){
      this.showView( new MainHomeView({}) )
    }

  })

  var initialize = function(){
    var app_router = new AppRouter
    Backbone.history.start()
  }

  return {
    initialize: initialize
  }
})
