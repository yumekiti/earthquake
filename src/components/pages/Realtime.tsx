import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

const Component = () => {
  const socketRef = useRef<ReconnectingWebSocket>()
  const [bodys, setBodys] = useState<any>([])

  useEffect(() => {
    const websocket = new ReconnectingWebSocket('wss://api.p2pquake.net/v2/ws')
    socketRef.current = websocket

    const onMessage = (event: MessageEvent<string>) => {
      const body = JSON.parse(event.data)
      setBodys((prevBodys: any) => [...prevBodys, body])
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
        {bodys.map((body: any, index: number) => (
          <li key={index}>{JSON.stringify(body)}</li>
        ))}
      </ul>
    </>
  )
}

export default Component
