const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
var server  		= require('http').createServer(app);
var io				= require('socket.io').listen(server);
//var codeParser		= bodyParser.urlencoded({extended:false}); 

let port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(__dirname);
	console.log("Listening Port " + port);
});

app.use(express.static(__dirname + '/dist'));
app.use('/public',express.static('public'));
app.get('/', (req, res) => {
	res.sendFile('index.html', { root : __dirname});
});
app.post('/',async(req, res) => {
	var nameFig = await req.body.nameFig;
	console.log(nameFig);
});

/*app.post('/',codeParser,(req, res) => {
	console.log(req.body);
});*/

users = [];
connections = [];

io.sockets.on('connection',(socket) => {
	console.log('Good connection');
	var clientIp = socket.request.connection.remoteAddress;
	console.log(clientIp);
	connections.push(socket);

	socket.on('disconnect',(date) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log('disconnect');
	});
});