import React from 'react'
import {useArrayStateApi} from 'use-state-api-hooks';

const App = () => {
  const list = useArrayStateApi([1,2]);

  return (
    <div >
      <button onClick={list.reverse} />
      {list.state.map(listItem => (
        <div key={listItem} >{listItem}</div>
      ))}
    </div>
  )
}
export default App
