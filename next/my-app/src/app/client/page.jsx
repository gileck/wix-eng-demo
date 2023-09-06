"use client"
import {useState} from "react";

export default function Client() {
    const [count, setCount] = useState(0)
    console.log({count})
    return <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count+1)}>INC</button>
        </div>
}
