"use client"
import {useState} from "react";

import dynamic from 'next/dynamic'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


export default function Client() {
    const [count, setCount] = useState(0)
    console.log({count})
    return <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count+1)}>INC</button>
        </div>
}
