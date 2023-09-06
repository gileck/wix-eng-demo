import React, {useEffect} from 'react'

function wrapPromise(promise) {
    let status = 'pending'
    let response

    const suspender = promise.then(
        (res) => {
            status = 'success'
            response = res
        },
        (err) => {
            status = 'error'
            response = err
        }
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw response
            default:
                return response
        }
    }

    return {read, status}
}

function SuspenseInner(props) {
    console.log('rendering suspense inner')
    props.api.read()
    return props.children
}

function BoxWrapper(props) {

    const [color, setColor] = React.useState('lightgray')
    useEffect(() => {
        setColor('lightblue')
    })
    return <div style={{
        border: '1px solid black',
        padding: '8px',
        width: '200px',
        backgroundColor: color
    }}>
        {props.children}
    </div>
}

function Fallback() {
    return <div>Loading...</div>
}

function createPromise(name) {
    return wrapPromise(new Promise((resolve) => setTimeout(() => resolve(), 1000)))
}

const isServer = typeof window === 'undefined'
if (!isServer) {
    window.resolvers = {}
}
function createPromise2(name) {
    return wrapPromise(new Promise((resolve) => resolvers[name] = resolve))
}

let times = {
    'Comp1': isServer ? 0 : 4000,
    'Comp2': isServer ? 0 : 5000,
    'Comp3': isServer ? 0 : 6000
}
function createPromise3(name) {
    return wrapPromise(new Promise((resolve) => setTimeout(() => resolve(), times[name])))
}

function emptyPromise() {
    return wrapPromise(Promise.resolve())
}

console.log({isServer})
export function SuspenseWrapper(props) {
    // const api = !isServer ? createPromise2(props.name) : emptyPromise()
    const api = createPromise(props.name)
    console.log("here")

    return (
        <React.Suspense fallback={<Fallback {...props} />}>
            <SuspenseInner api={api} {...props}>
                <BoxWrapper {...props}>
                    {props.name}
                </BoxWrapper>
            </SuspenseInner>
        </React.Suspense>
    )
}