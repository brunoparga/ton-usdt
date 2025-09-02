import { useState } from 'react'
import './App.css'

function App() {
  const [showPong, setShowPong] = useState(false)

  return (
    <>
      <h1>TON-USDT</h1>
      <div className="card">
        <button onClick={() => setShowPong(!showPong)}>
          PING
        </button>
        {showPong && <p>PONG</p>}
      </div>
    </>
  )
}

export default App
