import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const Component: React.FC<Props> = ({ children }) => {
  return (
    <div className="App h-screen flex flex-col text-sm md:text-base">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default memo(Component);
