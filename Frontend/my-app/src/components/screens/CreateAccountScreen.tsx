import React, { useState } from 'react';
import {TextField, Button} from '@material-ui/core';
import { useHistory } from "react-router-dom";

 /*
    Create Account Page UI:
        - First Name
        - Last Name
        - ISU Email
        - New Password, min 8 characters with special requirements
        - Repeat password with requirements
        - Submit button
        - Cancel button
 */

export default function CreateAccountScreen(){

    const[validPass, setValidPass] = useState(false);
    const[canCreateAccount, setCanCreateAccount] = useState(false);
    const[passwordsAreSimilar, setPasswordsAreSimilar] = useState(false);
    const[pass, setPass] = useState('');
    const[errorMessage, setErrorMessage] = useState('');

    const history = useHistory();
    const goToLogin = () => history.push('login');
    
    function checkRequirements()
    {
        if(validPass && passwordsAreSimilar)
        {
            setCanCreateAccount(true);
            setErrorMessage('');
        }
        else
        {
            var str = "";

            if(!validPass)
            {
                str += "Password must be at least 8 characters long and have one special character. ";
            }
            
            if(!passwordsAreSimilar)
            {
                str += "Your initial password and confirmed passwords are not consistent, please try reentering your password in the confirm password area. ";
            }

            console.log(validPass + "  " + passwordsAreSimilar);

            setErrorMessage(str);
        }
    }

    const checkPass=(e: any)=>{
        let hasCorrectLength = false;
        let hasSpecialChar = false;

        if(e.target.value === '' || e.target.value.length < 8)
        {
            //Empty or it's too short, disable button so they cannot create an account
            hasCorrectLength = false;
        }
        else if(e.target.value.length >= 8)
        {
            //This has the correct length
            hasCorrectLength = true;
        }
        
        for(var i = 0; i < e.target.value.length; i++)
        {
            var asciiValue = e.target.value.charCodeAt(i);

            if((asciiValue >= 33 && asciiValue <= 47) || (asciiValue >= 58 && asciiValue <= 63) || (asciiValue >= 91 && asciiValue <= 96))
            {
                hasSpecialChar = true;
            }
            else
            {
                hasSpecialChar = false;
            }
        }

        if(hasCorrectLength && hasSpecialChar)
        {
            setValidPass(true);
        }
        else
        {
            setValidPass(false);
        }

        setPass(e.target.value);
        checkRequirements();
    }

    return(
        <div style={{


        }}>
            <h1>Create Account</h1>
            <br></br>
            <TextField label="Enter First Name" name="firstName"></TextField>
            <br></br><br></br>
            <TextField label="Enter Last Name" name="lastName"></TextField>
            <br></br><br></br>
            <TextField label="Enter ISU Net-ID" name="netID"></TextField>
            <br></br><br></br>
            <TextField label="Password" name="password"  onChange={checkPass}></TextField>
            <br></br><br></br>
            <TextField label="Confirm Password" name="confirmPassword"  onChange={(e)=>{
                console.log(e.target.value === pass);
                if(e.target.value === pass)
                {
                    setPasswordsAreSimilar(true);
                }
                else
                {
                    setPasswordsAreSimilar(false);
                }

                checkRequirements();
             }}></TextField>
            <br></br><br></br>
            <Button variant="contained" disabled={!canCreateAccount} onClick={(e)=>{}}>Create Account</Button>&nbsp;&nbsp;
            <Button variant="contained" onClick={goToLogin}>Go to Login</Button>

            <h4 id="text_red">{errorMessage}</h4>
        </div>
    );
}
