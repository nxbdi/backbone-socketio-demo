// Filename: views/search/main
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'socketio'

], function($, _, Backbone){

  var app = new Backbone.Router

  var SearchInput = Backbone.View.extend({
    el: $('header'),

    events: {
      'submit #search': 'search'
    },

    search: function (e) {
      e.preventDefault()
      var searchTerm = $('#search-input').val()
      app.navigate('search/'+searchTerm, {trigger: true, replace: true})
    }

  })

  return SearchInput
})
