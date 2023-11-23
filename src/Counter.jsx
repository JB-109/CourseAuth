import { Card, Typography } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';

function Counter () {

    const [counter, setcounter] = useState(0);

    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
            <Card style={{padding: 20, width: 500}}>
                <Typography variant="h6" style={{display: "flex", justifyContent:"center"}}> Counter </Typography>
                <Typography variant="h6" style={{display: "flex", justifyContent:"center"}}> {counter} </Typography>
                <Buttons counter={counter} setcounter={setcounter}/>
            </Card>
        </div>
    )
}

function Buttons({counter, setcounter}) {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Increase counter={counter} setcounter={setcounter}/>
            <Decrease counter={counter} setcounter={setcounter}/>
        </div>
    )
}

function Increase({counter, setcounter}) {
    return (
        <Button variant="outlined" onClick={() => {
            setcounter(counter + 1)
        }}> Increase </Button>
    )
}

function Decrease({counter, setcounter}) {
    return (
        <Button variant="outlined" onClick={() => {
            setcounter(counter - 1)
        }}> Decrease </Button>
    )
}

export default Counter;