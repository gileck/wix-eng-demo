'use client'
import dynamic from 'next/dynamic'
import React, {useEffect} from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function FallbackBox(props) {
    return <div style={{
        border: '1px solid black',
        padding: '8px',
        width: '200px',
        backgroundColor: 'lightgray'
    }}>
        {props.children}
    </div>
}
function BoxWrapper(props) {
    const [hydrated, setHydrated] = React.useState(false)
    useEffect(() => {
        setHydrated(true)
    })
    return <div style={{
        border: '1px solid black',
        padding: '8px',
        width: '200px',
        backgroundColor: hydrated ? 'lightblue' : 'lightgray'
    }}>
        {props.children} ({hydrated ? 'hydrated' : 'server-rendered'})
    </div>
}


const loadDynamicComp = time => dynamic(() => wait(time).then(() => import('./dynamicComp.jsx')), {loading: () => <FallbackBox>Loading...</FallbackBox> })

const DynamicComp1 = loadDynamicComp(1000)
const DynamicComp2 = loadDynamicComp(2000)
const DynamicComp3 = loadDynamicComp(3000)

export default function Client() {
    return <div>
        <h1>NextJS</h1>
        <DynamicComp1>
            <BoxWrapper>Comp1</BoxWrapper>
        </DynamicComp1>
        <DynamicComp2>
            <BoxWrapper>Comp2</BoxWrapper>
        </DynamicComp2>
        <DynamicComp3>
            <BoxWrapper>Comp3</BoxWrapper>
        </DynamicComp3>
    </div>
}
