import { useEffect, useState } from 'react'
import './App.css'

import PropertyList from './components/PropertyList'

function App() {
  const [count, setCount] = useState("");

  useEffect(() => {
    fetch("/api/properties", {method: "GET", headers: {"Content-Type": 'application/json'}}).then(
      (r) => r.json()
    ).then((d) => setCount(JSON.stringify(d)));
  }, [])

  return (
    <>
      <PropertyList/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
