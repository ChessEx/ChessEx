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

app.get('/login', (req, res) => {
	res.sendFile('login.html', { root : __dirname});
});

app.get('/', (req, res) => {
	res.sendFile('index.html',{root : __dirname});
});

users = {};
connections = [];
var calls = 0;
paramsCall = [];
var defPos = { 
	wP:["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
	bP:["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
	wR:["a1","h1"],
	bR:["a8","h8"],
	wN:["b1","g1"],
	bN:["b8","g8"],
	wB:["c1","f1"],
	bB:["c8","f8"],
	wQ:["d1"],
	bQ:["d8"],
	wK:["e1"],
	bK:["e8"]
};
function getObj(mas){
	if(mas[0].nameFig != ' ' && mas[1] != undefined){
		var pos1 = mas[0].idField;
		var figure = String(mas[0].nameFig).slice(0,2);
		var pos2 = mas[1].idField;
		var masp = defPos[figure];
		masp[masp.indexOf(pos1)] = pos2;
		return defPos
	}else{return defPos}
}

io.sockets.on('connection',(socket) => {
	console.log('Good connection');
	var clientIp = (socket.request.connection.remoteAddress).slice(7);
	console.log(clientIp);
	var conId = Object.keys(socket.nsp.sockets)[0];
	connections.push(socket);

	app.post('/',(req, res) => {
		calls++;
		paramsCall.push(req.body.params);
		if(req.body.user != undefined){users[conId] = req.body.user.name};
		res.contentType('application/json');
		var obj = {
			user:users[conId],
			params:req.body.params,
			clientIp:clientIp,
			positions:getObj(paramsCall),
		};
		if(calls == 2){
			paramsCall = [];
			calls = 0;
		}
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