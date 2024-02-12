import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../server/config';
import { useRecoilState, useSetRecoilState } from "recoil";
import { currentUser } from './atoms/user';
import React from "react";

function Signin() {
  const navigate = useNavigate();
  const [username, setusername] = useState<string | undefined>();
  const [password, setpassword] = useState<string | undefined>();
  const [loggedInUser, setLoggedInUser] = useRecoilState(currentUser);
  const Body = { username: username, password: password }

  return (
    <div>

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "200px",
      }}>

        <Typography variant={"h6"} style={{
          color: "white"
        }}>
            Welcome back to Tunnel, SignIn Below - 
        </Typography>

      </div>

          <br/>

      <div style={{
          display: "flex",
          justifyContent: "center"
        }}>

        <Card variant="outlined" style={{width: 400, height: 190, padding: "20px"}}>

          <TextField fullWidth={true} id="Username" label="Username" variant="outlined" onBlur={(e) => {
            setusername(e.target.value);
          }}/>


          <br/><br/>
          <TextField fullWidth={true} id="Password" label="Password" variant="outlined" type="password" onBlur={(e) => {
            setpassword(e.target.value);
          }}/>

          <br/><br/>
          <Button 
            size="large" 
            variant="outlined" 
            onClick={async ()=> {

                await axios.post(`${BASE_URL}/admin/login`, Body, 
                  {
                    withCredentials: true
                  }
                ).then(response => {
                  if(response.status === 201) {
                    setLoggedInUser((ex) => ({
                      ...ex,
                      user: username,
                      isLoading: false
                    }));
                    navigate("/dashboard")
                  }
                }).catch(error => {
                  console.error(error.message);
                }) 
              
            }}>Sign In</Button>
        </Card>
        
      </div>
      
    </div>
  )
}
  
export default Signin;
  