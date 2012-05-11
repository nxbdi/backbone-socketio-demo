// Filename: views/search/main
define([
  'jquery',
  'use!underscore',
  'use!backbone',
  'mustache',
  'text!templates/search/tweet.mustache',
  'socketio',
  'bootstrap'
], function($, _, Backbone, Mustache, template){

  var SearchResults = Backbone.View.extend({
    el: $('#page'),

    events: {
      'click .not-ready': 'notReady'
    },

    initialize: function () {
      this.term = this.options.term || ''
    },

    render: function() {
      var socket = io.connect('http://backbone-socketio-demo.herokuapp.com')
        , self = this

      socket.emit('search', { term: this.term })
      socket.on('tweets', function (raw) {
        var data = JSON.parse(raw);
        self.tweet(data)
      })

      var compiledTemplate = Mustache.render(template, { term: this.term })
      $(this.el).html(compiledTemplate)
      return this.el
    },

    tweet: function (data) {
      console.log(data.user)
      var tweet = $('<div class="stream">'
        +'<img width="50px" height="50px" align="left" src="'+data.user.profile_image_url+'" />'
        +'<b><a href="http://twitter.com/'+data.user.name+'" target="_blank">'+data.user.name+'</a>: </b>'
        +data.text
        +'<br />'
        +'<span class="tweet-foot" title="'+data.created_at+'">'
        +'<i class="icon-black icon-time"></i>&nbsp;'+data.created_at
        +'</span>'
        +'<span class="tweet-foot">'
        +'<i class="icon-black icon-retweet"></i>&nbsp; <a href="#" class="not-ready retweet">retweet</a>'
        +'</span>'
        +'</div>');
      $('#stream').prepend(tweet);
      tweet.fadeIn(500);
    },

    notReady: function (e) {
      e.preventDefault()
    }

  })

  return SearchResults
})
