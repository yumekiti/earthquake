import { useEffect, useState } from 'react'

const Component = () => {
  const [time, setTime] = useState<Date>(new Date())
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <h1>Time</h1>
      <p>{time.toLocaleString()}</p>
    </>
  )
}

export default Component