import { useState, useEffect, ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
  time?: number;
};

const Component: FC<Props> = ({ children, time }) => {
  const [withinTime, setWithinTime] = useState(0);

  useEffect(() => {
    if (!time) return;
    const now = new Date();
    const formattedTime = new Date(time);
    const diff = (now.getTime() - formattedTime.getTime()) / 1000 / 60;
    setWithinTime(diff);
  }, [time]);

  let backgroundColor = "#F3F4F6";

  if (withinTime == 0) {
    backgroundColor = "#F3F4F6";
  } else if (withinTime <= 10) {
    backgroundColor = "#FEE2E2";
  } else if (withinTime <= 30) {
    backgroundColor = "#FEF9C3";
  } else if (withinTime <= 60) {
    backgroundColor = "#DBEAFE";
  } else {
    backgroundColor = "#F3F4F6";
  }

  return (
    <div
      className='h-full rounded-lg px-12 py-2 shadow-md border overflow-y-scroll'
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

export default Component;
