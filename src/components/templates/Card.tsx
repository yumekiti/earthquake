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

  return (
    <div
      className='h-full rounded-lg px-12 py-2 shadow-md border overflow-y-scroll'
      style={{
        backgroundColor:
          withinTime == 0
            ? "#F3F4F6"
            : withinTime <= 10
              ? "#FEE2E2"
              : withinTime <= 30
                ? "#FEF9C3"
                : withinTime <= 60
                  ? "#DBEAFE"
                  : "#F3F4F6"
      }}
    >
      {children}
    </div>
  );
};

export default Component;
