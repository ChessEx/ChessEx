import React from 'react';
import axios from 'axios';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name:'',
			pass:'',
			repass:'',
    		visL: '',
  		}
  		this.handleChange = this.handleChange.bind(this);
  		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChangeName (event) {
	    this.setState({ name: event.target.value });
	}
	handleChangePass (event) {
	    this.setState({ name: event.target.value });
	}
	handleChangeRepass (event) {
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
						<input className='form-control' name ='name' placeholder='username' onChange={this.handleChange} value = {this.state.name}/>
					</div>
					<div className='form-group'>
						<input className='form-control' name ='pass' placeholder='password' onChange={this.handleChange} value = {this.state.pass}/>
					</div>
					<div className='form-group'>
						<input className='form-control' name ='repass' placeholder='re-password' onChange={this.handleChange} value = {this.state.repass}/>
					</div>
					<button type='submit' className='btnLoginSub'>OK</button>
				</form>
			</div>
		)
	}
}

export default Login;