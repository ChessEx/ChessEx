import React from 'react';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
    		name: '',
  		}
	}
	handleChange (event) {
	    this.setState({ name: event.target.value });
	}
	 
	handleSubmit (event) {
	    event.preventDefault();
	 
	    const user = {
	      name: this.state.name
	    };
	 
	    axios.post(`${axios.defaults.baseURL}`, { user })
	      .then(res => {
	        console.log(res);
	    })
	}	
	render(){
		return(
			<div className = 'login'>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<input className='form-control' name='name' placeholder='username' onChange={this.handleChange}/>
						<button type='submit' className='btnLoginSub'>OK</button>
					</div>
				</form>
			</div>
		)
	}
}

export default Login;