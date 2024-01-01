import { useRef, useEffect, useState, FC } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

import EarthquakeInfo from "../organisms/EarthquakeInfo";
import TsunamiForecast from "../organisms/TsunamiForecast";
import Card from "../templates/Card";

type Props = {
  codes: string;
  isShowDetail: boolean;
};

const Component: FC<Props> = ({ codes, isShowDetail }) => {
  const socketRef = useRef<ReconnectingWebSocket>();
  const [bodys, setBodys] = useState<any>([]);

  useEffect(() => {
    const websocket = new ReconnectingWebSocket("wss://api.p2pquake.net/v2/ws");
    socketRef.current = websocket;

    const onMessage = (event: MessageEvent<string>) => {
      const body = JSON.parse(event.data);
      setBodys((prevBodys: any) => [body, ...prevBodys]);
    };
    websocket.addEventListener("message", onMessage);

    return () => {
      websocket.close();
      websocket.removeEventListener("message", onMessage);
    };
  }, []);

  return bodys
    .filter((body: any) => (codes ? body.code === Number(codes) : true))
    .map((body: any, index: number) => (
      <>
        {body.code === 551 ? (
          <EarthquakeInfo key={index} body={body} />
        ) : body.code === 552 ? (
          <TsunamiForecast key={index} body={body} />
        ) : (
          isShowDetail && (
            <Card key={index}>
              <li>{JSON.stringify(body)}</li>
            </Card>
          )
        )}
      </>
    ));
};

export default Component;
