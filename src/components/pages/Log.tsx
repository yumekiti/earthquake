import { useState } from "react";
import useSWR from "swr";

import { codeData } from "../../constants/code";
import EarthquakeInfo from "../organisms/EarthquakeInfo";
import TsunamiForecast from "../organisms/TsunamiForecast";
import Realtime from "../organisms/Realtime";
import Layout from "../templates/Layout";
import Card from "../templates/Card";

const Component = () => {
  const [codes, setCodes] = useState<string>("");
  const [limit, setLimit] = useState<string>("10");
  const [offset, setOffset] = useState<string>("0");
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const { data, error } = useSWR(
    `/v2/history?limit=${limit}&offset=${offset}${
      isShowDetail ? "" : "&codes=551&codes=552"
    }${isShowDetail && codes ? `&codes=${codes}` : ""}`,
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-full flex justify-around items-center">
          <div className="flex items-center gap-2">
            <label>取得数</label>
            <input
              type="number"
              className="w-16"
              value={limit}
              min="1"
              max="100"
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>取得位置</label>
            <input
              type="number"
              className="w-16"
              value={offset}
              min="0"
              onChange={(e) => setOffset(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-around items-center">
          <div className="flex items-center gap-2">
            <label>詳細表示</label>
            <input
              type="checkbox"
              checked={isShowDetail}
              onChange={() => setIsShowDetail(!isShowDetail)}
            />
          </div>
          {isShowDetail && (
            <select value={codes} onChange={(e) => setCodes(e.target.value)}>
              {codeData.map(({ value, label }, index) => (
                <option key={index} value={value}>
                  {label}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-2 p-2">
        <Realtime isShowDetail={isShowDetail} codes={codes} />
        {data.map((body: any, index: number) => (
          <>
            {body.code === 551 ? (
              <EarthquakeInfo key={index} body={body} />
            ) : body.code === 552 ? (
              <TsunamiForecast key={index} body={body} />
            ) : (
              <Card key={index}>
                <li>{JSON.stringify(body)}</li>
              </Card>
            )}
          </>
        ))}
      </ul>
    </Layout>
  );
};

export default Component;
