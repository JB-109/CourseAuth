import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { user } from "./atoms/user";

function Appbar() {

    const navigate = useNavigate();
    const [loggedInUser, setloggedInUser] = useRecoilState(user);
    console.log(loggedInUser);
       

        if(loggedInUser) {  
        return (
            <div style={{
                display: "flex",
                justifyContent: "space-between",
            }}>
                <Typography variant={"h6"} style={{
                    color: "white",
                    marginLeft: 5,
                }}>
                    {loggedInUser}
                </Typography>

                <div>
                <button
                    onClick = {() => {navigate("/admin/courses");}}
                    style={{marginRight: 5}}> COURSES
                </button>

                <button
                    onClick = {() => {navigate("/admin/addcourse");}}
                    style={{marginRight: 5}}> ADD COURSE
                </button>

                <button
                    onClick = {() => {navigate("/counter")}}
                    style={{marginRight: 5}}> COUNTER
                </button>
                <button 
                    onClick = {() => {
                        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        setloggedInUser("");
                    }}>
                        LOG OUT
                </button>
                </div>
            </div>
        );
        } else {
        return (
        <div style={{ 
            display: "flex",
            justifyContent: "flex-end"
        }}>
                <button 
                    onClick = {() => {navigate("/Signup");}} 
                    style={{marginRight: "4px"}}> SIGN UP
                </button>
                <button 
                    onClick = {() => {navigate("/Signin");}}
                    style = {{marginRight: "4px"}}> SIGN IN
                </button>
        </div>
        )
        }
}



export default Appbar;

// FOR PARSING THE COOKIE 
// () => {
    //     const cookies = document.cookie.split(';');
    //     for (let i = 0; i < cookies.length; i++) {
    //         const cookie = cookies[i].trim();
    //         if (cookie.startsWith(`token=`)) {
    //             return cookie.substring("token".length + 1);
    //         }
    //     }
    //     return null;
    // };
