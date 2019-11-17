getAccessFields = (obj,pos) => {
	let pos1 = obj[0].idField;
	let figure = String(obj[0].nameFig).slice(0,2);
	return {pos1,figure};
}

module.exports  = {
	AccessFields : getAccessFields,
}