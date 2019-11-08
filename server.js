const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
var server  		= require('http').createServer(app);
var io				= require('socket.io').listen(server);
var events			= require('events');
var myEmit			= new events.EventEmitter();

let port = process.env.PORT || 5000;
server.listen(port, () => {
	console.log(__dirname);
	console.log("Listening Port " + port);
});

app.use(express.static(__dirname + '/dist'));
app.use('/public',express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile('index.html', { root : __dirname});
});

users = {};
connections = [];

io.sockets.on('connection',(socket) => {
	console.log('Good connection');
	var clientIp = (socket.request.connection.remoteAddress).slice(7);
	console.log(clientIp);
	var conId = Object.keys(socket.nsp.sockets)[0];
	connections.push(socket);

	app.post('/',(req, res) => {
		req.body.user != undefined ? users[conId] = req.body.user.name: console.log('all good');
		res.contentType('application/json');
		var obj = {
			user:users[conId],
			params:req.body.params,
			clientIp:clientIp,
		};
		res.send(JSON.stringify(obj));
	});

	socket.on('getIp',(date) => {
		socket.emit(date,users);
		socket.emit('disconnect');
	});

	socket.on('disconnect',(socket) => {
		connections.splice(connections.indexOf(socket), 1);
		console.log('disconnect');
	});
});