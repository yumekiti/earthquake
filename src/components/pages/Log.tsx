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

  const handleLimitChange = (e: any) => {
    setLimit(e.target.value);
  };

  const handleOffsetChange = (e: any) => {
    setOffset(e.target.value);
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-full flex justify-around items-center">
          <div className="flex items-center gap-2">
            <label>取得数</label>
            <select value={limit} onChange={handleLimitChange}>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label>取得位置</label>
            <select value={offset} onChange={handleOffsetChange}>
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
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
        {data.map((body: any) => (
          <>
            {body.code === 551 ? (
              <EarthquakeInfo key={body.id} body={body} />
            ) : body.code === 552 ? (
              <TsunamiForecast key={body.id} body={body} />
            ) : (
              <Card key={body.id}>
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
