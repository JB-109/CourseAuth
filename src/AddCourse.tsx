import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Card from '@mui/material/Card';

function AddCourse() {
    const[Course, setCourse] = useState<string | undefined>();
    const[Description, setDescription] =  useState<string | undefined>();
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "150px"
        }}>
            <Card variant='outlined' style={{height: 190, width: 400, padding: "20px"}}>
           <TextField variant='outlined' id='CourseTitle' label='Course Title' fullWidth={true} onChange={(e) => {
            setCourse(e.target.value);
           }}></TextField>
            <br/><br/>
           <TextField variant='outlined' id='CourseDescription' label='Course Description' fullWidth={true} onChange={(e) => {
            setDescription(e.target.value);
           }}></TextField>
            <br/><br/>
           <Button variant='outlined' size='large' onClick={() => {
            fetch("http://localhost:3000/admin/add-courses", {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify({
                    title: Course,
                    description: Description
                }),
                headers: {
                    "content-type": "application/json"
                }
            });
           }}>Submit</Button>
           </Card>
        </div>
    )
}

export default AddCourse;