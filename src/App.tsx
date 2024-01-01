import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import useSWR from 'swr';

function App() {
  const socketRef = useRef<ReconnectingWebSocket>()
  const [bodys, setBodys] = useState<string[]>([])
  const [codes, setCodes] = useState<string>('')
  const [limit, setLimit] = useState<string>('10')
  const [offset, setOffset] = useState<string>('0')
  const { data, error } = useSWR(`/v2/history?limit=${limit}&offset=${offset}${codes ? `&codes=${codes}` : ''}`)

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

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data)

  return (
    <>
      <h1>Earthquake websocket</h1>
      <ul>
        {bodys.map((body, index) => (
          <li key={index}>{body}</li>
        ))}
      </ul>
      <h1>Earthquake API</h1>
      <select
        value={codes}
        onChange={(e) => setCodes(e.target.value)}
      >
        <option value="">すべて</option>
        <option value="551">地震情報</option>
        <option value="552">津波予報</option>
        <option value="554">緊急地震速報 発表検出</option>
        <option value="555">各地域ピア数</option>
        <option value="556">緊急地震速報（警報）</option>
        <option value="561">地震感知情報</option>
        <option value="9611">地震感知情報 解析結果</option>
      </select>
      <input
        type="number"
        value={limit}
        min="1"
        max="100"
        onChange={(e) => setLimit(e.target.value)}
      />
      <input
        type="number"
        value={offset}
        min="0"
        onChange={(e) => setOffset(e.target.value)}
      />
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.code}</li>
        ))}
      </ul>
    </>
  )
}

export default App
