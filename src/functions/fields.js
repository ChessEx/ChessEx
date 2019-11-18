getAccessFields = (obj,pos) => {
	let pos1 = obj[0].idField;
	let figure = String(obj[0].nameFig).slice(0,2);

	var figureType  = figure.slice(1);
	var color		= figure.slice(0,1);

	var trans = {
		'a' : 1,
		'b'	: 2,
		'c' : 3,
		'd'	: 4,
		'e'	: 5,
		'f'	: 6,
		'g'	: 7,
		'h' : 8,
	}

	switch (figureType){
		case 'P' :
			return pawn([pos,pos1,color,trans]);
			break;
		case 'R' :
			return rook([pos,pos1,color,trans]);
			break;
		case 'N' :
			return night([pos,pos1,color,trans]);
			break;
		case 'B' :
			return bishop([pos,pos1,color,trans]);
			break;
		case 'K' :
			return king([pos,pos1,color,trans]);
			break;	
		case 'Q' :
			return queen([pos,pos1,color,trans]);
			break;		
		default : 
			console.log('def');
	}

	return {pos1,figure};
}

var night = (params) => {	

}

var pawn = (params) => {
	let pos1  = params[1];
	let allPos = params[0];
	let color = params[2];
	let x = pos1[0];
	let y = pos1[1];
	switch (color){
		case 'w':
			if(y==2){return [x+(+y+1),x+(+y+2)]}else{return [x+(+y+1)]};
		case 'b':
			if(y == 7){return [x+(+y-1),x+(+y-2)]}else{return [x+(+y-1)]};
		default :
			return null;
	}
} 

var rook = (params) => {
	let pos1  = params[1];
	let allPos = params[0];
	let color = params[2];
	let trans = params[3];
	let x = pos1[0];
	let y = pos1[1];
	let res = [];
	for(var key in trans){
		res.push(key+y);
		res.push(x+trans[key]);
	}
	res = res.filter(item => item != pos1).sort();
	return res;
}

var bishop = (params) => {
	let pos1  = params[1];
	let allPos = params[0];
	let color = params[2];
	let trans = params[3];
	let x = pos1[0];
	let y = pos1[1];
	let res = [];
	for(var key in trans){
		let deltaX = Math.abs(trans[x] - trans[key]);
		for(var i = 1;i<=8;i++){
			let deltaY = Math.abs(y - i);
			if(deltaX == deltaY){
				res.push(key+i);
			}
		}
	}
	res = res.filter(item => item != pos1).sort().reverse();
	return res;
}

var king = (params) => {

}

var queen = (params) => {

}

module.exports  = {
	AccessFields : getAccessFields,
}