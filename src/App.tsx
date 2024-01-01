import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

function App() {
  const socketRef = useRef<ReconnectingWebSocket>()
  const [bodys, setBodys] = useState<string[]>([])

  useEffect(() => {
    const websocket = new ReconnectingWebSocket('wss://api.p2pquake.net/v2/ws')    
    socketRef.current = websocket

    const onMessage = (event: MessageEvent<string>) => {
      setBodys((prev) => [...prev, event.data])
    }
    websocket.addEventListener('message', onMessage)

    return () => {
      websocket.close()
      websocket.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <>
      <h1>Earthquake websocket</h1>
      <ul>
        {bodys.map((body, index) => (
          <li key={index}>{body}</li>
        ))}
      </ul>
    </>
  )
}

export default App
