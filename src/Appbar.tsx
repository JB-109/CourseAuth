import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { user } from "./atoms/user";
import { BASE_URL } from "../server/config";
import React from "react";

function Appbar() {

    const navigate = useNavigate();
    const [loggedInUser, setloggedInUser] = useRecoilState(user);

    useEffect(() => {
        async function fetchData() {
        try {
        await axios.get(`${BASE_URL}/admin/me`,{
            withCredentials: true
        }).then(response => {
            setloggedInUser((ex) => ({
                ...ex, 
                user: response.data.username
            }));
        });
        } catch (err) {
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.error(err.message);
        } finally {
            setloggedInUser((ex) => ({
                ...ex,
                isLoading: false
            }));
        }
        }
        fetchData();
    }, []);
       
    if(loggedInUser.isLoading) {
        return null;
    }
        if(loggedInUser.user) {  
        return (
            <div style={{
                backgroundColor: "#363636",
                display: "flex",
                justifyContent: "space-between",
                padding: 5
            }}>
                <Typography variant={"h6"} style={{
                    color: "white",
                    marginLeft: 5,
                }}>
                    {loggedInUser.user}
                </Typography>

                <div>
                <button
                    onClick = {() => {navigate("/dashboard");}}
                    style={{marginRight: 5}}> DASHBOARD
                </button>

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
                        setloggedInUser((ex) => ({
                            ...ex,
                            user: ""
                        }));
                        navigate("/dashboard");
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
