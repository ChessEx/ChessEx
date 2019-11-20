getAccessFields = (obj,pos) => {
	let pos1 = obj[0].idField;
	let figure = String(obj[0].nameFig).slice(0,2);

	let allPos = pos;

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

	var getF = () => {
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
				return ('def');
		}
	}
	var result = [...getF()];
	for(var key in allPos){
		if(key[0] == color){
			result = result.filter(item => !allPos[key].includes(item));
		}
	}
	return result;
}

var night = (params) => {	
	let pos1  = params[1];
	let allPos = params[0];
	let color = params[2];
	let x = pos1[0];
	let y = pos1[1];
	let trans = params[3];
	let res = [];
	function getKey(object, value){
		return Object.keys(object).find(key => object[key] === value);
	}
	for(var i = 1;i<=8;i++){
		for(var n = 2;n>=-2;n--){
			let sum = Math.abs(trans[x]-i)**2 + Math.abs(n)**2;
			if(sum == 5){
				res.push(getKey(trans,i) + (+y+n));
			}
		}
	}
	res = res.filter(item => ((item != pos1) && (item[1] > 0) && (item.slice(1) < 9))).sort();
	return res;
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
	let pos1  = params[1];
	let allPos = params[0];
	let color = params[2];
	let trans = params[3];
	let x = pos1[0];
	let y = pos1[1];
	let prevX = getKey(trans,trans[x] - 1);
	let nextX = getKey(trans,trans[x] + 1);
	let res = [];
	function getKey(object, value){
		return Object.keys(object).find(key => object[key] === value);
	}
	for(var i = 1;i>=-1;i--){
		res.push(
			(prevX + (+y+i)),
			(x + (+y+i)),
			(nextX + (+y+i))
			);
	}
	res = res.filter(item => (item != pos1) && (item[1] > 0) && (item[1] < 9));
	return res
}

var queen = (params) => {
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
	for(var key in trans){
		let deltaX = Math.abs(trans[x] - trans[key]);
		for(var i = 1;i<=8;i++){
			let deltaY = Math.abs(y - i);
			if(deltaX == deltaY){
				res.push(key+i);
			}
		}
	}
	res = res.filter(item => item != pos1).sort();
	return res;
}

module.exports  = {
	AccessFields : getAccessFields,
}