import ReactDOM from "react-dom";
import React from 'react';
import Board from './board.js';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {}
    }
	render(){
	  	return (
		  	<div>
		  		<Board/>
		  	</div>
	  	)
	}
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}
