import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from "axios";
import { BASE_URL } from './config';
//import { currentUser } from './atoms/atoms.jsx';
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDetails } from "./atoms/credentials";
import { user } from './atoms/user';

function Signin() {
  const [username, setusername] = useState();
  const [password, setpassword] = useState();
  const [loggedInUser, setLoggedInUser] = useRecoilState(user);

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
              try {
                const response = await axios.post(`${BASE_URL}/admin/login`,
                  { 
                    username: username,
                    password: password
                  },
                  {
                    withCredentials: true
                  }
                )
                setLoggedInUser(username);
              } catch (error) {
                console.error(error.message);
              }
            }}>Sign In</Button>
        </Card>
        
      </div>
      
    </div>
  )
}
  
export default Signin;
  