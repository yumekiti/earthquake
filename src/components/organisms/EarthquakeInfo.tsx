import { FC } from "react";

import IssueInfo from "../molecules/IssueInfo";
import EarthquakeInfo from "../molecules/EarthquakeInfo";
import IntensityPointsInfo from "../molecules/IntensityPointsInfo";
import Card from "../templates/Card";

type Props = {
  body: any;
};

const Component: FC<Props> = ({ body }) => {
  return (
    <Card time={body.time}>
      <li>受信日時：{body.time}</li>
      <EarthquakeInfo body={body} />
      <IssueInfo body={body} />
      <IntensityPointsInfo body={body} />
    </Card>
  );
};

export default Component;
