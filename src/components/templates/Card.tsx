import { useState, useEffect, ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
  time?: number;
};

const Component: FC<Props> = ({ children, time }) => {
  const [now, setTime] = useState<Date>(new Date());
  const [diff, setDiff] = useState<number>(0); // [分]
  const [isWithin10, setIsWithin10] = useState(false);
  const [isWithin30, setIsWithin30] = useState(false);
  const [isWithin60, setIsWithin60] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!time) return;

    const formattedTime = time.toString().replace(/-/g,"/").split(".")[0];
    const diff = (now.getTime() - new Date(formattedTime).getTime()) / 1000 / 60;
    setDiff(diff);

    setIsWithin10(diff < 10);
    setIsWithin30(diff >= 10 && diff < 30);
    setIsWithin60(diff >= 30 && diff < 60);
  }, [now, time, isWithin10, isWithin30, isWithin60]);

  return (
    <div className={'h-full w-full rounded-lg py-2 overflow-y-scroll border border-gray-400 ' +
      (isWithin10 ? 'bg-red-100' : isWithin30 ? 'bg-yellow-100' : isWithin60 ? 'bg-blue-100' : 'bg-gray-100')
    }>
      {time && (
        <div className="px-4 py-2 text-xs text-gray-500">
          {/* 何分前か diff */}
          {Math.floor(diff)}分前
        </div>
      )}
      <div className="px-12">
        {children}
      </div>
    </div>
  );
};

export default Component;
