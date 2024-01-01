import { FC } from "react"

import IssueInfo from '../molecules/IssueInfo';
import TsunamiForecastDetails from '../molecules/TsunamiForecastDetails';
import Card from '../templates/Card';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <Card time={body.time}>
      <li>受信日時：{body.time}</li>
      <li>津波予報が解除されたかどうか：{body.cancelled ? 'はい' : 'いいえ'}</li>
      <IssueInfo body={body} />
      <TsunamiForecastDetails body={body} />
    </Card>
  )
}

export default Component