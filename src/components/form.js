import ReactDOM from "react-dom";
import React from 'react';
import axios from 'axios';
class Input extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    render(){
    	return(
    		<div className="input">
				<label for={this.props.name}>{this.props.value}</label>
				<input type={this.props.type} name={this.props.name}  autocomplete="off" onFocus = {this.props.func} id = {this.props.id} onChange = {this.props.change}/>
				<span className="spin"></span>
			</div>
    	)
    }
}

class Form extends React.Component {
	constructor(props) {
        super(props);
        this.newRegName = this.newRegName.bind(this);
        this.newRegPass = this.newRegPass.bind(this);
        this.newRegRepass = this.newRegRepass.bind(this);
        this.sendData = this.sendData.bind(this);
        this.state = {
        	regname : "",
        	regpass : "",
        	reregpass : ""
        }
    } 
    inputAnim(){
    	for(let i =0;i<5;i++){
            document.getElementsByTagName('input')[i].onfocus = function(){
               this.parentNode.childNodes[0].style.lineHeight = "18px";
               this.parentNode.childNodes[0].style.fontSize = "18px";
               this.parentNode.childNodes[0].style.fontWeight = "100";
               this.parentNode.childNodes[0].style.top = "0px";
               this.parentNode.childNodes[2].style.width = "100%";

            };
         }
         for(let i =0;i<5;i++){        	
         	   document.getElementsByTagName('input')[i].onblur = function(){
         	   if(document.getElementsByTagName('input')[i].value == ""){
               this.parentNode.childNodes[0].style.lineHeight = "60px";
               this.parentNode.childNodes[0].style.fontSize = "24px";
               this.parentNode.childNodes[0].style.fontWeight = "300";
               this.parentNode.childNodes[0].style.top = "10px";
               this.parentNode.childNodes[2].style.width = "0%";
           	   }
           	   else{
           	   		this.parentNode.childNodes[2].style.width = "0%";
           	   }
         		};
         	          
      	}
  	}  
    buttonAnim(e){
    	if(!document.getElementsByTagName('button')[0].classList.contains('active')){
    		var elem = document.getElementById('buttton');
    	var i = 0,k=0;
	    	var pX = e.pageX,
	         	pY = e.pageY,
	         	oX = parseInt(elem.getBoundingClientRect().left),
	         	oY = parseInt(elem.getBoundingClientRect().top);

	        elem.insertAdjacentHTML("beforeEnd",'<div class="click-efect x-' + oX + ' y-' + oY +
	         '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 
	         'px;"></div>');
	        function anim(){
	        	i+=2;
	        	document.getElementsByClassName('click-efect')[0].style.width = i+"px";
	        	document.getElementsByClassName('click-efect')[0].style.height = i+"px";
	        	if(i == 500)clearInterval(s);
	        	if(k>-250)k--;
	        	document.getElementsByClassName('click-efect')[0].style.top = k+"px";
	            document.getElementsByClassName('click-efect')[0].style.left = k+"px";
	        	
	        }
	        
	        var s = setInterval(anim,2);
	        

	        document.getElementsByTagName('button')[0].classList.add('active');
    	}
    	
    }
    openRegForm(){
    
    	var elem = document.getElementById('material-button');   			   			
    	if(elem.classList.contains('material-button') ){
    		setTimeout(function() {		
			    document.getElementsByClassName('overbox')[0].style.overflow = 'hidden';
			    document.getElementsByClassName('box')[0].classList.add('back');   							      
			}, 200)
    		setTimeout(function() {		
			    elem.style.height = "700px";
			    elem.style.width = "700px";
			}, 500)

    		elem.classList.add('active'); 
			        			        
			setTimeout(function() {
			    document.getElementsByClassName('shape')[0].style.width = "50%";
			    document.getElementsByClassName('shape')[0].style.height = "50%";
			    document.getElementsByClassName('shape')[0].style.transform = "rotate(45deg)";
			            
				for(let k = 1;k<7;k++){
					document.getElementsByClassName('overbox')[0].childNodes[k].style.display = "block";
				    document.getElementsByClassName('overbox')[0].childNodes[k].style.opacity = "1";
				}
			}, 800)
			setTimeout(function(){elem.classList.remove('material-button');},1050);

		
				
			return 0 ;
					     
    			}

    	if(!elem.classList.contains('material-button')){
    		document.getElementsByClassName('shape')[0].style.width = "100%";
			document.getElementsByClassName('shape')[0].style.height = "100%";
			document.getElementsByClassName('shape')[0].style.transform = "rotate(0deg)";
			setTimeout(function(){elem.classList.add('material-button');},1100);
			setTimeout(function() {		
			    document.getElementsByClassName('overbox')[0].style.overflow = 'initial'; 							      
			}, 500)

			elem.style.height = "100px";
			elem.style.width = "100px";
			setTimeout(function() {		
			    document.getElementsByClassName('box')[0].classList.remove('back');
			    elem.classList.remove('active');						      
			}, 400)
			        
			for(let k = 1;k<7;k++){
				document.getElementsByClassName('overbox')[0].childNodes[k].style.display = "none";
			    document.getElementsByClassName('overbox')[0].childNodes[k].style.opacity = "0";
			}
			document.getElementsByClassName('overbox')[0].childNodes[2].style.background = "none";
						
			return 0 ;
    			}
    	}
    	newRegName(e){
    		this.state.regname = e.target.value;
    	}
    	newRegPass(e){
    		this.state.regpass = e.target.value;
    	}
    	newRegRepass(e){
    		this.state.regrepass = e.target.value;
    	}
    	sendData(){    		
    		var err = "";
    		var data = {
    			name : this.state.regname,
    			password: this.state.regpass,
    			repeatPassword : this.state.regrepass
    		}
    		if(data.name == "" || data.password == "" || data.repeatPassword == ""){
    			err += "Не все поля заполнены!" + " ";
    			document.getElementById('errors').style.background = "red";
    		}
    		if(data.password != data.repeatPassword){
    			err += "Пароли не совпадают!" + " ";
    			document.getElementById('errors').style.background = "red";
    		}
    		if(err == ""){
    			document.getElementById('errors').style.background = "#64d864";
    			document.getElementById('errors').style.color = "black";
    			err = "Регистрация прошла успешно!"
    			document.getElementById('errors').innerText=err;
    			/*$.ajax({
	    			type : 'POST',
	    			data : JSON.stringify(data),
	    			contentType : 'application/json',
	    			url : '/users',
	    			complete : function(data){
	    				console.log(data.responseJSON);
	    			}
    			})*/
    			axios.post('/users',{data})
    				.then(res => {
    					console.log(res);
    				});
    		}
    		else{
    			document.getElementById('errors').innerText=err;
    		}
    		
    	}
	render(){
	  	return (
		  	
		  	<div className="materialContainer" id="materialContainer">
				<div className="box">
				    <div className="title">LOGIN</div>
				    <Input name = "name" type="text" value = "Username" func = {this.inputAnim} id="name"/>

				    <Input name = "pass" type="pasword" value = "Password" id="pass" func = {this.inputAnim}/>

				    <div className="button login" id="buttton" onClick = {this.buttonAnim}>
				       	<button><span>GO</span> <i className="fa fa-check"></i></button>
				    </div>

				    <a href="" className="pass-forgot">Forgot your password?</a>
				</div>

				<div className="overbox">
				      <div className="material-button alt-2" id="material-button" onClick = {this.openRegForm}><span className="shape"></span></div>

				      <div className="title">REGISTER</div>

				      <div id="errors"></div>

				         <Input name = "regname" type="text" value = "Username" func = {this.inputAnim}  id="regname" change = {this.newRegName}/>

				      <Input name = "regpass" type="password" value = "Password" func = {this.inputAnim} id="regpass" change = {this.newRegPass}/>

				      <Input name = "reregpass" type="repassword" value = "Repeat Password" func = {this.inputAnim} id="reregpass" change = {this.newRegRepass}/>
				     
				      <div className="button" onClick = {this.sendData}>
				         <button><span>NEXT</span></button>
				      </div>				   
				</div>
			</div>
	  	)
	}
}

const app = document.getElementById('root');
if(app){
    ReactDOM.render(<Form/>, app);
}