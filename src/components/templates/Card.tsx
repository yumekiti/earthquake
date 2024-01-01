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

  let backgroundClass = "gray";

  if (withinTime == 0) {
    backgroundClass = "gray";
  } else if (withinTime <= 10) {
    backgroundClass = "red";
  } else if (withinTime <= 30) {
    backgroundClass = "yellow";
  } else if (withinTime <= 60) {
    backgroundClass = "blue";
  } else {
    backgroundClass = "gray";
  }

  return (
    <div className={`h-full rounded-lg px-12 py-2 shadow-md border overflow-y-scroll ${backgroundClass}`}>
      {children}
    </div>
  );
};

export default Component;
