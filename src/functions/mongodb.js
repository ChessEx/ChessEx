function mongoConnect(){

	const mongoose		= require('mongoose');

	mongoose
		.connect(
			'mongodb+srv://admin:admin@chessex-efzes.mongodb.net/chessex?retryWrites=true&w=majority',
			{
				useNewUrlParser:true,
				useUnifiedTopology: true,
			}
		)
		.then(() => console.log('MongoDb connect'))
		.catch((err) => console.log(err)); 

	const UsersSchema = new mongoose.Schema({
		name:{
			type:String,
		},
		pass:{
			type:String,
		},
		repass:{
			type:String,
		},
		
	});
	const GamesSchema = new mongoose.Schema({
		field:{
			type:Object,
			required:true,
		},
		turn:{
			type:String,
			required:true,
		},
	});

	const Users 	= mongoose.model('Users',UsersSchema);
	const Games 	= mongoose.model('Games',GamesSchema);

	return {
		Users 	 : Users,
		adjUsers : UsersSchema, 
		Game 	 : Games,
		};
};

module.exports = {

	connect 	 : mongoConnect,

};