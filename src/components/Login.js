import React from 'react';
import {TextField} from '@material-ui/core';

import {
  useHistory
} from "react-router-dom";
import axios from 'axios';

import {Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(props){
  const [username, setUsername ]= React.useState("");
  const [password, setPassword] = React.useState("");
  const [invokeUrl,setInvokeUrl] = React.useState("http://127.0.0.1:5000/newsify")

  const history = useHistory();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const updatePassword = (e) => {
    if(e.target.value !== 32){
      setPassword(e.target.value);
    }
  }

  const validateCredentials = (e) => {
    if(/\s/g.test(username) || username === "") {
      window.alert("Enter a valid username.")
    } else if (/\s/g.test(password) || password === "") {
      window.alert("Enter a valid password.")
    }
    else {
      axios.get(invokeUrl+'/users?username='+username+'&password='+password)
      .then(res => {
        if(res.data["result"] === "Invalid") {
          console.log()
          window.alert("Invalid credentials!");
        }
        else {
          history.push('/home', {
            username: res.data["result"]['username'], 
            tags: res.data["result"]["tags"],
            country: res.data["result"]["country"],
          });
        }
        
      }).catch(error => {
          window.alert("Invalid credentials.");
          console.log(error);
      }) 
    }
  }

  const goToSignup = (e) => {
    history.push('/signup');
  }

  return(
  <div style={styling.mainDiv}>
    <h1 style = {styling.title}> Newsify</h1>
    <h2> Login</h2>
    <TextField id="outlined-basic" 
                style = {styling.textField}
                label="Username:" 
                variant="outlined" 
                onChange = {updateUsername}/>
    <br/>            
    <TextField id="outlined-basic"
                style = {styling.textField} 
                label="Password:" 
                variant="outlined" 
                type="password"
                onKeyPress = {(e) => e.key === "Enter" ? validateCredentials() : null}
                onChange = {updatePassword}/>
    <br/>
    <Button variant="dark" 
            style = {styling.button} 
            onClick={validateCredentials}
            >Login</Button>
    <br/>
    <Button style = {styling.button} 
            onClick = {goToSignup}
            variant = 'dark'>New user? Sign up</Button>
  </div>);
}


//Styling for the page
const styling = {
  mainDiv: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    // border: '1px solid black',
    borderRadius: '10px',
    height: '48vh',
    width: '60vh',
    display: 'inline-block',
    textAlign: 'center',
  },
  textField: {
    marginBottom: '2vh',
    marginTop: '2vh'
  },
  button: {
    marginTop: '1vh',
  },
  title: {
    marginTop: '1vh',
    fontSize: "60px",
    fontWeight: 'bold',
    fontFamily: "Poynter"
  }
};