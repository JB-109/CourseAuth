import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, useThemeProps } from "@mui/material";
import React from "react";


function Getcourses() {

    const [courses, setcourses] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await axios.get("http://localhost:3000/admin/courses",{
                withCredentials: true,
            });
            setcourses(response.data);
        } catch (error){
            console.error((error as Error).message);
        } }
        fetchData();

},[]);

    let id = 0;
    return (
        courses.map((courses) => {
            id++;
            return <ShowCourses key={id} courses={courses} />
            
        })
    )
}

function ShowCourses(props: any) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
        }}>
        <Card style={{width: 170, height: 250, paddingLeft: 22.5, display: "flex", flexWrap: "wrap"}}>
            <Typography variant="h6">
                {props.courses.title}
            </Typography> 
            <Typography variant="subtitle1">
                {props.courses.description}
            </Typography>
            <img src="https://tnpsc.googlecraft.com/Thumbnail.jpg"/>
        </Card>
        </div>
    )
}


export default Getcourses;
