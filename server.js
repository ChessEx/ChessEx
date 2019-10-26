const express 	= require('express');
const app 		= express();
var server  	= require('http').createServer(app);
var io			= require('socket.io').listen(server);

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

users = [];
connections = [];

io.sockets.on('connection',function(socket){
	console.log('Good connection');
	var clientIp = socket.request.connection.remoteAddress;
	console.log(clientIp);
	connections.push(socket);

	socket.on('disconnect',function(date){
		connections.splice(connections.indexOf(socket), 1);
		console.log('disconnect');
	});
});