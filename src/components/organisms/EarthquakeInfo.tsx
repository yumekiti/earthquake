import { FC } from "react"

import IssueInfo from '../molecules/IssueInfo';
import EarthquakeInfo from '../molecules/EarthquakeInfo';
import IntensityPointsInfo from '../molecules/IntensityPointsInfo';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <>
      <li>受信日時：{body.time}</li>
      <EarthquakeInfo body={body} />
      <IssueInfo body={body} />
      <IntensityPointsInfo body={body} />
      <li>
        タイムスタンプ
        <ul>
          <li>更新時：{body.timestamp.convert}</li>
          <li>登録時：{body.timestamp.register}</li>
        </ul>
      </li>
    </>
  )
}

export default Component