const ronin     = require( 'ronin-server' )
const mocks     = require( 'ronin-mocks' )
var mongoose    = require('mongoose')
const server    = ronin.server()

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
// database.connect( process.env.CONNECTIONSTRING )
server.use( '/', mocks.server( server.Router(), false, false ) )

server.start()