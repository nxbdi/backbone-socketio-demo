define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'models/tweet'
], function($, _, Backbone, Tweet){
  var Tweets = Backbone.Collection.extend({
    model: Tweet,
  })

  return Tweets
})
