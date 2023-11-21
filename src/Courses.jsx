import { useEffect, useState } from "react";


function Getcourses() {

    const [courses, setcourses] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/courses", {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json()
         ).then(data => {
            setcourses(data);
            console.log(data);
        }).catch(error => {
            console.error(error.message);
        })
    },[]);

    return (
        {courses}
    )
}

export default Getcourses;
 