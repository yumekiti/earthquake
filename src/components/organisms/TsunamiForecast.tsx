import { FC } from "react"

import { gradeData } from '../../constants/grade';

import IssueInfo from '../molecules/IssueInfo';
import TsunamiForecastDetails from '../molecules/TsunamiForecastDetails';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <>
      <li>受信日時：{body.time}</li>
      <li>津波予報が解除されたかどうか：{body.cancelled ? 'はい' : 'いいえ'}</li>
      <IssueInfo body={body} />
      <TsunamiForecastDetails body={body} />
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