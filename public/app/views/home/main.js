// Filename: views/home/main
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'mustache',
  'text!templates/home/main.mustache',

], function($, _, Backbone, Mustache, template){

  var app = new Backbone.Router()

  var MainHomeView = Backbone.View.extend({

    el: $('#page'),

    render: function() {
      var compiledTemplate = Mustache.render(template, { })
      $(this.el).html(compiledTemplate)
      return this
    }

  })

  return MainHomeView
})
