import { useEffect, useState } from "react";

const Component = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 p-4">
        <h2>リアルタイム地震情報</h2>
        <p>{time.toLocaleString()}</p>
      </div>
    </>
  );
};

export default Component;
