import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import React from "react";

function Signup() {
  const [Username, setUsername] = useState<string | undefined>();
  const [Password, setPassword] = useState<string | undefined>();

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
             Welcome to Tunnel, Signup Below
        </Typography>

      </div>

          <br/>

      <div style={{
          display: "flex",
          justifyContent: "center"
        }}>

        <Card variant="outlined" style={{width: 400, height: 190, padding: "20px"}}>

          <TextField fullWidth={true} id="Username" label="Username" variant="outlined" onChange={(e) => {
            setUsername(e.target.value);
          }}/>

          <br/><br/>
          <TextField fullWidth={true} id="Password" label="Password" variant="outlined" type="password" onChange={(e) => {
            setPassword(e.target.value);
          }}/>

          <br/><br/>
          <Button 
            size="large" 
            variant="outlined" 
            onClick={()=> {
                fetch("http://localhost:3000/admin/signup", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    username: Username,
                    password: Password
                  }),
                  headers: {
                    "content-type": "application/json"
                  }
              });
          }}>Sign Up</Button>
          
        </Card>
        
      </div>
      
    </div>
  )
}
  
export default Signup;
  