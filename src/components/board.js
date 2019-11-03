import React from 'react';


class Figure extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			figId:this.props.figId,
	    };
	}
	render(){
		const style = { backgroundColor: this.props.colorBg};
		return(
			<img src={this.props.figure} className='figure'/>
		)
	}
}

class Field extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			fieldIndex:this.props.index,
			src:'',
			stateField:false,
			colorField:this.props.colorBg,

	    };	
	    this.handleClick = this.handleClick.bind(this);    
	}
	getFigure(){
		var str = this.state.fieldIndex;
		var obj = { 
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
		for(var key in obj){
			for(var i = 0;i<obj[key].length;i++){
				if(obj[key][i] == str){
					this.state.src = getKey(obj,obj[key]);
				}
			}
		}
		function getKey(object, value) {
		 	return ('/public/images/figures/' + (Object.keys(object).find(key => object[key] === value)).toString() + '.png');
		}
		return <Figure figure = {this.state.src} figId = {this.state.fieldIndex}/>;
	}	
	handleClick(e){
		e.preventDefault();	
		var name =(this.state.src).slice((this.state.src).length-6,-4) + ' ';
		console.log(name + this.state.fieldIndex + ' was clicked ');
	}
	render(){
		const style = { backgroundColor: this.state.colorField};
		return(
			<div className = 'field' style = {style} id = {this.props.index} onClick={this.handleClick}> {this.getFigure()} </div>
		)
	}
}

class Board extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			value : 1,
			white:'#B2BBC6',
			black:'#818992',
			colorBg: '#fff',
			index: ''
	    };
	}
	
	FillField(){
		var mas = [];
		for(var n = 8;n>=1;n--){
			for (var i = 1;i<=8;i++){
				if(i==1){

				}else{
					this.state.value = !this.state.value;
				}
				if(this.state.value == 0){
					this.state.colorBg = this.state.black;
				}else{
					this.state.colorBg = this.state.white;
				}
				var obj = {
					1:'a',
					2:'b',
					3:'c',
					4:'d',
					5:'e',
					6:'f',
					7:'g',
					8:'h'
				}
				this.state.index = obj[i] + n.toString();

				mas.push(<Field colorBg = {this.state.colorBg} index = {this.state.index}/>);
			}
		}
		return mas;
	}
	render(){
		return(
			<div className = 'board' id = 'board'>
				{this.FillField()}
			</div>
		)
	}
}

export default Board;