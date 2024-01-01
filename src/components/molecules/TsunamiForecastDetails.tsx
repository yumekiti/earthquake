import { FC } from "react";

import { gradeData } from "../../constants/grade";

type Props = {
  body: any;
};

const Component: FC<Props> = ({ body }) => {
  return body.areas.map((area: any, index: number) => (
    <details key={index}>
      <summary>津波予報区名：{area.name}</summary>
      津波予報の詳細
      <ul className="list-disc">
        <li>
          津波予報の種類：
          {gradeData.find((grade: any) => grade.value === area.grade)?.label}
        </li>
        <li>直ちに津波が来襲すると予想されているかどうか：{area.immediate}</li>
        <li>
          津波の到達予想時刻
          <ul className="list-disc">
            <li>第1波の到達予想時刻：{area.firstHeight.arrivalTime}</li>
            <li>第1波の到達予想時刻の状況：{area.firstHeight.condition}</li>
          </ul>
        </li>
        <li>
          予想される津波の高さ
          <ul className="list-disc">
            <li>説明：{area.maxHeight.description}</li>
            <li>単位：{area.maxHeight.value}</li>
          </ul>
        </li>
      </ul>
    </details>
  ));
};

export default Component;
