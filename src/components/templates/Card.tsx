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
  }, []);

  return (
    <div
      className={`h-full rounded-lg px-12 py-2 shadow-md bg-white border overflow-y-scroll
      ${
        withinTime == 0
          ? "bg-white"
          : withinTime <= 10
            ? "bg-red-100"
            : withinTime <= 30
              ? "bg-yellow-100"
              : withinTime <= 60
                ? "bg-blue-100"
                : "bg-gray-100"
      }
    `}
    >
      {children}
    </div>
  );
};

export default Component;
