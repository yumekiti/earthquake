import { useState, useEffect, ReactNode, FC } from 'react';

type Props = {
  children: ReactNode;
  time?: number;
};

const Component: FC<Props> = ({ children, time }) => {
  const [withinTime, setWithinTime] = useState(0);

  useEffect(() => {
    if (!time) return;
    const now = new Date();
    const formattedTime = new Date(time)
    const diff = (now.getTime() - formattedTime.getTime()) / 1000 / 60;
    setWithinTime(diff);
  }, []);

  return (
    <div className={`h-full rounded-lg px-12 py-2 shadow-md bg-white border overflow-y-scroll
      ${withinTime == 0 ? 'border-gray-200' : withinTime <= 10 ? 'border-red-500' : withinTime <= 30 ? 'border-yellow-500' : withinTime <= 60 ? 'border-blue-500' : 'border-gray-200'}
    `}>
      {children}
    </div>
  )
};

export default Component;