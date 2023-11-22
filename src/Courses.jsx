import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, useThemeProps } from "@mui/material";


function Getcourses() {

    const [courses, setcourses] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
            const response = await axios.get("http://localhost:3000/courses",{
                withCredentials: true,
            });
            setcourses(response.data);
            console.log(response.data);
        } catch (error){
            console.error(error.message);
        }
        }
        fetchData();
},[]);
    let counter = 0;
    return (
        courses.map((courses) => {
            counter++;
            console.log(counter)
            console.log(courses);
            console.log(courses.title)
            return <ShowCourses key={counter} courses={courses} />
            
        })
    )
}

function ShowCourses(props) {
    return (
        <div style={{
            display: "flex"
        }}>
        <Card style={{width: 300, height: 40, display: "flex",}}>
            <Typography variant="h6">
                {props.courses.title}
            </Typography> 
            <Typography variant="subtitle1">
                {props.courses.description}
            </Typography>
        </Card>
        </div>
    )
}


export default Getcourses;


 // fetch("http://localhost:3000/courses", {
        //     method: "GET",
        //     credentials: "include",
        //     headers: {
        //         "content-type": "application/json"
        //     }
        // }).then(response => response.json()
        //  ).then(data => {
        //     setcourses(data);
        //     console.log(data);
        // }).catch(error => {
        //     console.error(error.message);
        // });
        