import classnames from 'classnames';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

const HeaderLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  return (
    <>
      <div
        className={classnames(
          'z-40 left-0 top-0 w-full h-20',
          'bg-white',
          'flex items-center',
        )}
      >

        <div className="flex items-center justify-between flex-auto">
          {children}
        </div>
      </div>
    </>
  );
}

export default HeaderLayout;
