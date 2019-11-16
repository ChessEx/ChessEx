const express 		= require('express');
const bodyParser 	= require('body-parser');
const app 			= express();
const mongo 		= require(__dirname + '/src/functions/mongodb.js');
const fields 		= require(__dirname + '/src/functions/fields.js');
var server  		= require('http').createServer(app);
var io				= require('socket.io').listen(server);
var events			= require('events');
var myEmit			= new events.EventEmitter();

let port 			= process.env.PORT || 5000;
server.listen(port, () => {
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

MongoParams 		= mongo.connect();
usersdb 			= MongoParams.Users;
gamedb 				= MongoParams.Game;
//adjUsers 			= MongoParams.adjUsers.obj;

function addInDb(NewObj){
	var smthnew = new usersdb(NewObj);
	smthnew.save((err) => {
		if(err) throw err;
		console.log('Successfully saved');
	});
}
app.post('/users', (req, res) => {
	
	usersdb.create(
		{	
			name:req.body.data.name,
			pass : req.body.data.password,
			repass : req.body.data.repeatPassword,
		}
	);/* add new user
	//addInDb({name:'danik'}); //add new user everytime when you go on /users
	/*usersdb.deleteOne({name:'gg'},function(err,result){
		if(err) return console.log(err);    
    	console.log(result);
	}); //delete one with gg
	usersdb.deleteMany({name:/\.},function(err,result){
		if(err) return console.log(err);    
    	console.log(result);
	});// delete all with danik*/
	/*usersdb.updateOne({name:'danik'},{name:'Nikita'}, function(err, result){    
	    if(err) return console.log(err);
	    console.log(result);
	}); change one danik on niktia
	usersdb.updateMany({name:'danik'},{name:'Nikita'}, function(err, result){    
	    if(err) return console.log(err);
	    console.log(result);
	});change all danik on nikita */
	usersdb.find()
		.then((user) => res.send(user))
		.catch((err) => res.send(err));
});
app.get('/users',(req, res) => {
	function resetUsers(){
		usersdb.deleteMany({name:/./},function(err,result){
			if(err) return console.log(err);    
	    	console.log(result);
		});
	}
	//resetUsers(); //use this if you want reset users
	usersdb.find()
		.then((user) => res.send(user))
		.catch((err) => res.send(err)); // this find user in database
});

app.get('/positions', (req, res) => {
	gamedb.find()
		.then((game) => res.send(game))
		.catch((err) => res.send(err));
});

app.post('/positions', (req, res) => {

});

users = {};
connections = [];
var calls = 0;
paramsCall = [];
AccessFields = fields.AccessFields;

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
	if(mas[0].nameFig != undefined && mas[1] != undefined){
		var pos1 = mas[0].idField;
		var figure = String(mas[0].nameFig).slice(0,2);
		var pos2 = mas[1].idField;
		var masp = defPos[figure];
		masp[masp.indexOf(pos1)] = pos2;
		return {
			pos:defPos,
			FromTo:[pos1,pos2],
		}
	}else{return {
			'pos':defPos,
			'FromTo':[pos1,pos2],
		}}
}

io.sockets.on('connection',(socket) => {
	console.log('Good connection');
	var clientIp = (socket.request.connection.remoteAddress).slice(7);
	//console.log(clientIp);
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
			positions:getObj(paramsCall)['pos'],
			FromTo:getObj(paramsCall)['FromTo'],
			accessFields:AccessFields(paramsCall),
		};
		if(calls == 2 || req.body.params.nameFig == undefined){
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