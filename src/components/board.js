import React from 'react';

class Field extends React.Component{
	constructor(props) {
	    super(props);
	    
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
			white:'#fff',
			black:'#000',
			colorBg: '#fff',
	    };
	}
	
	FillField(){
		var mas = [];
		for(var n = 1;n<=8;n++){
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
				mas.push(<Field colorBg = {this.state.colorBg}/>);
			}
		}
		return mas;
	}
	render(){
		return(
			<div className = 'board'>
				{this.FillField()}
			</div>
		)
	}
}

export default Board;