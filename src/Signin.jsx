import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
//import { currentUser } from './atoms/atoms.jsx';
import { useRecoilState } from "recoil";
import { userDetails } from "./atoms/credentials";

function Signin() {
  // const [Username, setUsername] = useState();
  // const [Password, setPassword] = useState();
  const [credentials, setcredentials] = useRecoilState(userDetails);
  console.log(credentials);

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
             Welcome back to Tunnel, Signin Below
        </Typography>

      </div>

          <br/>

      <div style={{
          display: "flex",
          justifyContent: "center"
        }}>

        <Card variant="outlined" style={{width: 400, height: 190, padding: "20px"}}>

          <TextField fullWidth={true} id="Username" label="Username" variant="outlined"onChange={(e) => {
            setcredentials((prevCredentials) => ({
              ...prevCredentials,
              username: e.target.value,
            }));
          
          }}/>

          <br/><br/>
          <TextField fullWidth={true} id="Password" label="Password" variant="outlined" type="password" onChange={(e) => {
            setcredentials((prevCredentials) => ({
              ...prevCredentials,
              password: e.target.value,
            }));
          
          }}/>

          <br/><br/>
          <Button 
            size="large" 
            variant="outlined" 
            onClick={()=> {
               fetch("http://localhost:3000/admin/login", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                  }),
                  headers: {
                    "content-type": "application/json"
                  }
              });
              //window.location = "/"
          }}>Sign In</Button>
          
        </Card>
        
      </div>
      
    </div>
  )
}
  
export default Signin;
  