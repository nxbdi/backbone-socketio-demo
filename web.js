var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app)


/*
 *  Express middlewares and settings here
 */

app.use(express.favicon())
app.use(express.static(__dirname + '/public'))

// bodyParser should be above methodOverride
app.use(express.bodyParser())
app.use(express.methodOverride())

// cookieParser should be above session
app.use(express.cookieParser())

// logger
app.use(express.logger(':method :url :status'))


/*
 *  Express Routing here
 */


/*
 *  Sockets
 */

// assuming io is the Socket.IO server object
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {

  socket.on('search', function (data) {

    // prepare the https request
    var https = require('https')
      , basicAuth = 'Basic ' + new Buffer(process.env['TWITTER_USERNAME']+':'+process.env['TWITTER_PASSWORD']).toString('base64')
      , options = {
          host: 'stream.twitter.com',
          path: '/1/statuses/filter.json?track='+data.term,
          headers: {  'Host'          : 'stream.twitter.com',
                      'Content-Type'  : 'application/json',
                      'Connection'    : 'keep-alive',
                      'Authorization' : basicAuth
          },
          method : 'POST'
        }

    var req = https.request(options, function(res) {
      res.setEncoding('utf8')
      res.on('data', function (chunk) {
        socket.emit('tweets', chunk)
      })
    })

    req.on('error', function(e) {
      console.log(e)
      console.log('problem with request: ' + e.message)
    })

    req.end()
  })
})



// Start the server
var port = process.env.PORT || 3000

app.listen(port, function() {
  console.log("Listening on " + port)
})
