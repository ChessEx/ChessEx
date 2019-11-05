import React from 'react';
import axios from 'axios';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
    		visL: '',
  		}
  		this.handleChange = this.handleChange.bind(this);
  		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange (event) {
	    this.setState({ name: event.target.value });
	}
	 
	handleSubmit (event) {
	    event.preventDefault();
	 
	    const user = {
	      name: this.state.name
	    };
	 
	    axios.post('/', { user })
	      	.then(res => {
	        	console.log(res.data);
	        	this.setState({visL: 'none'});
	    });
	}	
	render(){
		const style = {display:this.state.visL};
		return(
			<div className = 'login' style = {style} >
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<input className='form-control' name='name' placeholder='username' onChange={this.handleChange} value = {this.state.name}/>
						<button type='submit' className='btnLoginSub'>OK</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;