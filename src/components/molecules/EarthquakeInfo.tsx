import { FC } from "react";

import { scaleData } from "../../constants/scale";
import { domesticTsunamiData } from "../../constants/domesticTsunami";
import { foreignTsunamiData } from "../../constants/foreignTsunami";

type Props = {
  body: any;
};

const Component: FC<Props> = ({ body }) => {
  return (
    <li className="mb-4">
      地震情報
      <ul className="list-disc">
        <li>発生日時：{body.earthquake.time}</li>
        <li>
          震源情報
          <ul className="list-disc">
            <li>名称：{body.earthquake.hypocenter.name}</li>
            <li>
              緯度：
              {body.earthquake.hypocenter.latitude == -200
                ? "震源情報が存在しない"
                : body.earthquake.hypocenter.latitude}
            </li>
            <li>
              経度：
              {body.earthquake.hypocenter.longitude == -200
                ? "震源情報が存在しない"
                : body.earthquake.hypocenter.longitude}
            </li>
            <li>
              深さ{"("}km{")"}：
              {body.earthquake.hypocenter.depth == 0
                ? "ごく浅い"
                : body.earthquake.hypocenter.depth == -1
                  ? "震源情報が存在しない"
                  : body.earthquake.hypocenter.depth}
            </li>
            <li>
              マグニチュード：
              {body.earthquake.hypocenter.magnitude == -1
                ? "震源情報が存在しない"
                : body.earthquake.hypocenter.magnitude}
            </li>
          </ul>
        </li>
        <li>
          最大震度：
          {
            scaleData.find(
              (scale: any) => scale.value == body.earthquake.maxScale,
            )?.label
          }
        </li>
        <li>
          国内への津波の有無：
          {
            domesticTsunamiData.find(
              (domesticTsunami: any) =>
                domesticTsunami.value == body.earthquake.domesticTsunami,
            )?.label
          }
        </li>
        <li>
          海外での津波の有無：
          {
            foreignTsunamiData.find(
              (foreignTsunami: any) =>
                foreignTsunami.value == body.earthquake.foreignTsunami,
            )?.label
          }
        </li>
      </ul>
    </li>
  );
};

export default Component;
