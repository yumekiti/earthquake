import { FC } from "react"

import { scaleData } from '../../constants/scale';
import { typeData } from '../../constants/type';
import { domesticTsunamiData } from '../../constants/domesticTsunami';
import { foreignTsunamiData } from '../../constants/foreignTsunami';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <>
      <li>受信日時：{body.time}</li>

      <li>
        地震情報
        <ul>
          <li>発生日時：{body.earthquake.time}</li>
          <li>
            震源情報
            <ul>
              <li>名称：{body.earthquake.hypocenter.name}</li>
              <li>緯度：{body.earthquake.hypocenter.latitude}</li>
              <li>経度：{body.earthquake.hypocenter.longitude}</li>
              <li>深さ{'('}km{')'}：{body.earthquake.hypocenter.depth === 0 ? 'ごく浅い' : body.earthquake.hypocenter.depth === -1 ? '震源情報が存在しない' : body.earthquake.hypocenter.depth}</li>
              <li>マグニチュード：{body.earthquake.hypocenter.magnitude === -1 ? '震源情報が存在しない' : body.earthquake.hypocenter.magnitude}</li>
            </ul>
          </li>
          <li>最大震度：{scaleData.find((scale: any) => scale.value === body.earthquake.maxScale)?.label}</li>
          <li>国内への津波の有無：{domesticTsunamiData.find((domesticTsunami: any) => domesticTsunami.value === body.earthquake.domesticTsunami)?.label}</li>
          <li>海外での津波の有無：{foreignTsunamiData.find((foreignTsunami: any) => foreignTsunami.value === body.earthquake.foreignTsunami)?.label}</li>
        </ul>
      </li>

      <li>
        発表元の情報
        <ul>
          <li>発表元：{body.issue.source}</li>
          <li>発表日時：{body.issue.time}</li>
          <li>発表種類：{typeData.find((type: any) => type.value === body.issue.type)?.label}</li>
          <li>訂正の有無：{body.issue.correct}</li>
        </ul>
      </li>
{/* 
      <details><summary>震度観測点の情報</summary>
        {
          body.points.map((point: any, index: number) => (
            <ul key={index}>
              <li>震度観測点名称：{point.addr}</li>
              <li>区域名かどうか：{point.isArea ? 'はい' : 'いいえ'}</li>
              <li>都道府県：{point.pref}</li>
              <li>震度：{scaleData.find((scale: any) => scale.value === point.scale)?.label}</li>
            </ul>
          ))
        }
      </details> */}

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