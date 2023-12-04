import { Card, Typography } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import { atom, RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import React from "react";

const counterState = atom({
    key: "counter",
    default: 0
});

function Counter() {
    return (
        <div style={{display: "flex", justifyContent: "center", marginTop: 100}}>
            <RecoilRoot>
            <Card style={{padding: 20, width: 500}}>
                <Typography variant="h6" style={{display: "flex", justifyContent:"center"}}>
                    Counter </Typography>
                <CurrentState/>
                <Buttons/>
            </Card>
            </RecoilRoot>
        </div>
    )
}

function CurrentState() {
    const counter = useRecoilValue(counterState);
    return (
        <Typography variant="h6" style={{display: "flex", justifyContent:"center"}}> 
            {counter} </Typography>
    )
}

function Buttons() {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Decrease/>
            <Increase/>
        </div>
    )
}

function Increase() {
    const setcounter = useSetRecoilState(counterState);
    return (
        <Button variant="outlined" onClick={() => {
            setcounter(ex => ex + 1);
        }}> Increase </Button>
    )
}

function Decrease() {
    const setcounter = useSetRecoilState(counterState);
    return (
        <Button variant="outlined" onClick={() => {
            setcounter(ex => ex - 1);
        }}> Decrease </Button>
    )
}

export default Counter;