import React, {useEffect} from 'react'

function FallbackBox() {
    return <div style={{
        border: '1px solid black',
        padding: '8px',
        width: '200px',
        backgroundColor: 'lightgray'
    }}>
        Loading...
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

function wrapPromise(promise) {
    let status = 'pending'

    const suspender = promise.then(() => {
            status = 'success'
        }
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            default:
                // Also possible to save the resolved value and return it
                return status
        }
    }

    return {read, status}
}

function SuspenseInner(props) {
    // The read function throw the promise when it's not resolved
    // and return a value when its resolved
    props.api.read()
    return props.children
}

function createPromise(name, time) {
    const promise = new Promise((resolve) => setTimeout(() => resolve(), isServer ? time : time * 2))
    return wrapPromise(promise)
}

const isServer = typeof window === 'undefined'

if (!isServer) {
    window.resolvers = {}
}

function createPromise2(name) {
    const promise = new Promise((resolve) => resolvers[name] = resolve)
    return wrapPromise(promise)
}

function emptyPromise() {
    return wrapPromise(Promise.resolve())
}

export function SuspenseWrapper(props) {
    // const api = !isServer ? createPromise2(props.name, props.time) : emptyPromise()



    const api = createPromise(props.name, props.time)
    return (
        <React.Suspense fallback={<FallbackBox />}>
            <SuspenseInner api={api} {...props}>
                <BoxWrapper {...props}>
                    {props.name}
                </BoxWrapper>
            </SuspenseInner>
        </React.Suspense>
    )
}