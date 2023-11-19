import { useState, useEffect } from "react";

function Courses() {
    const [courses, setcourses] = useState();

    useEffect(() => {
        fetch("http://localhost:3000/courses", {
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            return response.json()}
            ).then(data => {
                setcourses(JSON.stringify(data));
                console.log(JSON.stringify(data));
            })
        },[])

    return (
        <div>
            {courses}
        </div>
    )
}

export default Courses;