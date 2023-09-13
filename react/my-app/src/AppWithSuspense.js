import React from 'react'
import {SuspenseWrapper} from "./SuspenseWrapper";


function App() {
  return (
    <div>
        <h1>React</h1>
        <SuspenseWrapper name={'Comp1'} time={1000}/>
        <SuspenseWrapper name={'Comp2'} time={2000}/>
        <SuspenseWrapper name={'Comp3'} time={3000}/>
    </div>
  );
}

export default App;
