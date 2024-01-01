import { FC } from "react"
import { typeData } from '../../constants/type';
import { gradeData } from '../../constants/grade';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <>
      <li>受信日時：{body.time}</li>

      <li>津波予報が解除されたかどうか：{body.cancelled ? 'はい' : 'いいえ'}</li>

      <li>
        発表元の情報
        <ul>
          <li>発表元：{body.issue.source}</li>
          <li>発表日時：{body.issue.time}</li>
          <li>発表種類：{typeData.find((type: any) => type.value === body.issue.type)?.label}</li>
        </ul>
      </li>

      <li>
        津波予報の詳細
        <ul>
          <li>津波予報の種類：{gradeData.find((grade: any) => grade.value === body.areas[0].grade)?.label}</li>
          <li>直ちに津波が来襲すると予想されているかどうか：{body.areas[0].immediate}</li>
          <li>津波予報区名：{body.areas[0].name}</li>
          <li>
            津波の到達予想時刻
            <ul>
              <li>第1波の到達予想時刻：{body.areas[0].firstHeight.arrivalTime}</li>
              <li>第1波の到達予想時刻の状況：{body.areas[0].firstHeight.condition}</li>
            </ul>
          </li>
          <li>
            予想される津波の高さ
            <ul>
              <li>説明：{body.areas[0].maxHeight.description}</li>
              <li>単位：{body.areas[0].maxHeight.value}</li>
            </ul>
          </li>
        </ul>
      </li>

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