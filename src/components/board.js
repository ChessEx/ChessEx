import React from 'react';




class Field extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {
			index: this.props.index
	    };	    
	}	
	render(){
		const style = { backgroundColor: this.props.colorBg};
		return(
			<div className = 'field' style = {style}></div>
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