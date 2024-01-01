import { useState } from 'react'
import useSWR from 'swr';
import { codeData } from '../../constants/code';
import EarthquakeInfo from '../organisms/EarthquakeInfo';

const Component = () => {
  const [codes, setCodes] = useState<string>('')
  const [limit, setLimit] = useState<string>('10')
  const [offset, setOffset] = useState<string>('0')
  const { data, error } = useSWR(`/v2/history?limit=${limit}&offset=${offset}${codes ? `&codes=${codes}` : ''}`)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log(data)

  return (
    <>
      <h1>Earthquake API</h1>
      <select
        value={codes}
        onChange={(e) => setCodes(e.target.value)}
      >
        {codeData.map(({value, label}, index) => (
          <option key={index} value={value}>{label}</option>
        ))}
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
        {data.map((body: any) => (
          <div key={body.id}>
            {body.code === 551 ? (
              <EarthquakeInfo body={body} />
            ) : (
              <li>{JSON.stringify(body)}</li>
            )}
          </div>
        ))}
      </ul>
    </>
  )
}

export default Component