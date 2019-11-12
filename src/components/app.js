import ReactDOM from "react-dom";
import React from 'react';
import Board from './board.js';
import Login from './login.js';

class App extends React.Component {
	constructor(props) {
        super(props);
        this.state = {}
    }
	render(){
	  	return (
		  	<React.Fragment>
		  		<Board/>
		  	</React.Fragment>
	  	)
	}
}

const app = document.getElementById('app');
if(app){
    ReactDOM.render(<App/>, app);
}
