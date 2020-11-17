import React, { useState } from 'react';
import {TextField, Button} from '@material-ui/core';
import {useHistory} from "react-router-dom";

export default function CreateAccountScreen(){
    const[canCreateAccount, setCanCreateAccount] = useState(false);
    const[passwordsAreSimilar, setPasswordsAreSimilar] = useState(false);
    const[pass, setPass] = useState('');
    const[errorMessage, setErrorMessage] = useState('Make sure every field is filled out; Passwords need to be at least 8 characters long.');

    const[netId, setNetId] = useState('');
    const[firstName, setFirstName] = useState('');
    const[lastName, setlastName] = useState('');

    const history = useHistory();
    const goToLogin = () => history.push('login');
    
    function checkRequirements()
    {
      if(pass.length >= 8 && passwordsAreSimilar){
        setCanCreateAccount(true);
      }
      else{
        setCanCreateAccount(false);
      }
    }

    async function doesTheUserExist(callback:Function){
      var exists = false;

      try{
        await fetch('/userExists', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            netId: netId,
          }),
        }).then((response) => response.json())
          .then((json) => {
            if(json.length > 0 && json !== undefined){
              exists = true;
            }
            else{
              callback();
            }
          });
      }
      catch(e){
        console.log(e);
      }
    }

    function createAccount(){
        try{
          fetch('/addUser', {
            method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                netId: netId,
                LastName: lastName,
                FirstName: firstName,
                password: pass,
              }),
            });

            goToLogin();
        }
        catch(e){
          console.log(e);
        }
      }

    return(
        <div style={{
          marginLeft: '40%',
          marginRight: '40%',
        }}>
            <h1>Create Account</h1>
            <br></br>
            <TextField label="Enter First Name" name="firstName" onChange={(e)=>{setFirstName(e.target.value)}} error={firstName.length === 0}></TextField>
            <br></br><br></br>
            <TextField label="Enter Last Name" name="lastName" onChange={(e)=>{setlastName(e.target.value)}} error={lastName.length === 0}></TextField>
            <br></br><br></br>
            <TextField label="Enter Net-ID" onChange={(e)=>{setNetId(e.target.value)}} error={netId.length === 0}></TextField>
            <br></br><br></br>
            <TextField label="Password" name="password" error={pass.length === 0} onChange={(e)=>{
              setPass(e.target.value);
            }}></TextField>
            <br></br><br></br>
            <TextField label="Confirm Password" name="confirmPassword" error={!passwordsAreSimilar} onChange={(e)=>{
                if(e.target.value === pass){
                    setPasswordsAreSimilar(true);
                }
                else{
                    setPasswordsAreSimilar(false);
                }
             }}></TextField>
            <br></br><br></br>
            <Button variant="contained"  onClick={()=>{
              checkRequirements();
              if(canCreateAccount){
                doesTheUserExist(createAccount);
              }
            }}>Create Account</Button>&nbsp;&nbsp;
            <Button variant="contained" onClick={goToLogin}>Go to Login</Button>

            <h4 style={{color: "red"}}>{errorMessage}</h4>
        </div>
    );
}
