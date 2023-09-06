import React, {Suspense} from 'react'
import {SuspenseWrapper} from "./SuspenseWrapper";


function Comp() {
    return <div> Suspensed Component </div>
}
function App() {
  return (
    <div>
        <SuspenseWrapper name={'Comp1'}/>
        <SuspenseWrapper name={'Comp2'}/>
        <SuspenseWrapper name={'Comp3'}/>
    </div>
  );
}

export default App;
