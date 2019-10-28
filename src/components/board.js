import React from 'react';


class Figure extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			FieldFig:this.props.fieldIndex,
			nameFig:this.props.nameFigure,
	    };
	}
	namedFig(){
		return (this.state.nameFig + ' ' + 'figure');
	}
	render(){
		const style = { backgroundColor: this.props.colorBg};
		return(
			<img className={this.namedFig()} src={this.props.figure}/>
		)
	}
}

class Field extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			figure:'public/images/figures/',
			fieldIndex:this.props.index,
			nameFigure:'',
	    };	    
	}
	getFigure(){
		var obj = {
			1:{
				a:'wR.png',
				b:'wN.png',
				c:'wB.png',
				d:'wQ.png',
				e:'wK.png',
				f:'wB.png',
				g:'wN.png',
				h:'wR.png'
			},
			2:'wP.png',
			7:'bP.png',
			8:{
				a:'bR.png',
				b:'bN.png',
				c:'bB.png',
				d:'bQ.png',
				e:'bK.png',
				f:'bB.png',
				g:'bN.png',
				h:'bR.png'
			},
		};
		var str1 = (this.state.fieldIndex)[1];
		var str0 = (this.state.fieldIndex)[0];
		switch (str1){
			case '1':
			case '8':
				this.state.figure += obj[str1][str0];
				this.state.nameFigure = obj[str1][str0].slice(0,2)
				break;
			case '2':
			case '7':
				this.state.figure += obj[str1];	
				break;
			default:
				this.state.figure = '';	
		}
		return <Figure figure = {this.state.figure} fieldIndex = {this.state.fieldIndex} nameFigure = {this.state.nameFigure}/>;
	}	
	render(){
		const style = { backgroundColor: this.props.colorBg};
		return(
			<div className = 'field' style = {style} id = {this.props.index}> {this.getFigure()} </div>
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