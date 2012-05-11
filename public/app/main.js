// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.

// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",

    jquery: '../assets/js/libs/jquery/jquery-min',
    underscore: '../assets/js/libs/underscore/underscore-min',
    backbone: '../assets/js/libs/backbone/backbone-min',
    text: '../assets/js/libs/require/text',
    mustache: '../assets/js/libs/mustache/mustache',
    handlebars: '../assets/js/libs/handlebars/handlebars',
    bootstrap: '../assets/js/bootstrap/bootstrap.min',
    socketio: '/socket.io/socket.io',
    templates: './templates',

    // Shim Plugin
    use: '../assets/js/libs/require/use-min'
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    },

    bootstrap: {
      deps: ["jquery"]
    }
  },

  waitSeconds: 10
});

require([

  // Load our app module and pass it to our definition function
  'app'

  // Some plugins have to be loaded in order due to their non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
  console.log('Main initialized')
});
