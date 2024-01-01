import { FC } from 'react'

import { typeData } from '../../constants/type';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <li>
      発表元の情報
      <ul>
        <li>発表元：{body.issue.source}</li>
        <li>発表日時：{body.issue.time}</li>
        <li>発表種類：{typeData.find((type: any) => type.value == body.issue.type)?.label}</li>
        {
          body.issue.correct &&
          <li>訂正の有無：{body.issue.correct}</li>
        }
      </ul>
    </li>
  )
}

export default Component
