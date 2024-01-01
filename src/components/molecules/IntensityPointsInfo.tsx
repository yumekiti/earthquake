import { FC } from 'react'

import { scaleData } from '../../constants/scale';

type Props = {
  body: any
}

const Component: FC<Props> = ({ body }) => {
  return (
    <details><summary>震度観測点の情報</summary>
      {
        body.points.map((point: any, index: number) => (
          <ul key={index}>
            <li>震度観測点名称：{point.addr}</li>
            <li>区域名かどうか：{point.isArea ? 'はい' : 'いいえ'}</li>
            <li>都道府県：{point.pref}</li>
            <li>震度：{scaleData.find((scale: any) => scale.value == point.scale)?.label}</li>
          </ul>
        ))
      }
    </details>
  )
}

export default Component