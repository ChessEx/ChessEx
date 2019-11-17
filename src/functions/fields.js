getAccessFields = (obj,pos) => {
	let pos1 = obj[0].idField;
	let figure = String(obj[0].nameFig).slice(0,2);

	var figureType = figure.slice(1);

	switch (figureType){
		case 'P' :
			return pawn([pos,pos1]);
			break;
		case 'R' :
			return rook([pos,pos1]);
			break;
		case 'N' :
			return night([pos,pos1]);
			break;
		case 'B' :
			return bishop([pos,pos1]);
			break;
		case 'K' :
			return king([pos,pos1]);
			break;	
		case 'Q' :
			return queen([pos,pos1]);
			break;		
		default : 
			console.log('def');
	}

	return {pos1,figure};
}

var night = (params) => {
	return {params};
}

var pawn = (params) => {

}

var rook = (params) => {

}

var bishop = (params) => {

}

var king = (params) => {

}

var queen = (params) => {

}

module.exports  = {
	AccessFields : getAccessFields,
}