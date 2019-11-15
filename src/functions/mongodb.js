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
			required: true,
		},
	});

	const Users = mongoose.model('Users',UsersSchema);

	return {
		Users 	 : Users,
		adj	  	 : UsersSchema, 
		};
};

module.exports = {

	connect 	 : mongoConnect,

};