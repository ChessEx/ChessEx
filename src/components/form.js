import ReactDOM from "react-dom";
import React from 'react';

class Form extends React.Component {
	constructor(props) {
        super(props);
        this.state = {}
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
               this.parentNode.childNodes[0].style.lineHeight = "60px";
               this.parentNode.childNodes[0].style.fontSize = "24px";
               this.parentNode.childNodes[0].style.fontWeight = "300";
               this.parentNode.childNodes[0].style.top = "10px";
               this.parentNode.childNodes[2].style.width = "0%";

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
    	if(elem.classList.contains('material-button')){
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
			            
				for(let k = 1;k<6;k++){
					document.getElementsByClassName('overbox')[0].childNodes[k].style.display = "block";
				    document.getElementsByClassName('overbox')[0].childNodes[k].style.opacity = "1";
				}
			}, 800)

			elem.classList.remove('material-button');
			return 0 ;			     
    			}

    	if(!elem.classList.contains('material-button')){
    		document.getElementsByClassName('shape')[0].style.width = "100%";
			document.getElementsByClassName('shape')[0].style.height = "100%";
			document.getElementsByClassName('shape')[0].style.transform = "rotate(0deg)";

			setTimeout(function() {		
			    document.getElementsByClassName('overbox')[0].style.overflow = 'initial'; 							      
			}, 500)

			elem.style.height = "100px";
			elem.style.width = "100px";
			setTimeout(function() {		
			    document.getElementsByClassName('box')[0].classList.remove('back');
			    elem.classList.remove('active');						      
			}, 400)
			        
			for(let k = 1;k<6;k++){
				document.getElementsByClassName('overbox')[0].childNodes[k].style.display = "none";
			    document.getElementsByClassName('overbox')[0].childNodes[k].style.opacity = "0";
			}
			elem.classList.add('material-button');
			return 0 ;
    			}
    	}
	render(){
	  	return (
		  	
		  		<div className="materialContainer" id="materialContainer">
				   <div className="box">
				      <div className="title">LOGIN</div>
				      <div className="input">
				         <label for="name">Username</label>
				         <input type="text" name="name" id="name" onFocus = {this.inputAnim}/>
				         <span className="spin"></span>
				      </div>

				      <div className="input">
				         <label for="pass">Password</label>
				         <input type="password" name="pass" id="pass" onFocus = {this.inputAnim}/>
				         <span className="spin"></span>
				      </div>

				      <div className="button login" id="buttton" onClick = {this.buttonAnim}>
				         <button><span>GO</span> <i className="fa fa-check"></i></button>
				      </div>

				      <a href="" className="pass-forgot">Forgot your password?</a>

				   </div>

				   <div className="overbox">
				      <div className="material-button alt-2" id="material-button" onClick = {this.openRegForm}><span className="shape"></span></div>

				      <div className="title">REGISTER</div>

				      <div className="input">
				         <label for="regname">Username</label>
				         <input type="text" name="regname" id="regname" onFocus = {this.inputAnim}/>
				         <span className="spin"></span>
				      </div>

				      <div className="input">
				         <label for="regpass">Password</label>
				         <input type="password" name="regpass" id="regpass" onFocus = {this.inputAnim}/>
				         <span className="spin"></span>
				      </div>

				      <div className="input">
				         <label for="reregpass">Repeat Password</label>
				         <input type="password" name="reregpass" id="reregpass" onFocus = {this.inputAnim}/>
				         <span className="spin"></span>
				      </div>

				      <div className="button">
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