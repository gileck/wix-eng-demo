'use client'
import React from "react";

const Comp1 = React.lazy(() => import('./Comp1.jsx'))
const Comp2 = React.lazy(() => import('./Comp2.jsx'))
const Comp3 = React.lazy(() => import('./Comp3.jsx'))

export default function Client() {

    const Comps = [Comp1, Comp2, Comp3]
    const Comp = Comps[2]

    return <div>
        <h1> React Lazy with SSR </h1>
        <Comp />
    </div>
}
