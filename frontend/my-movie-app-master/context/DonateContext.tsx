import React, { createContext, useContext, useState, ReactNode } from "react";

interface DonateModalContextProps {
  openDonate: boolean;
  setOpenDonate: (open: boolean) => void;
}

const DonateModalContext = createContext<DonateModalContextProps | undefined>(
  undefined
);

export const useDonateModal = () => {
  const context = useContext(DonateModalContext);
  if (!context) {
    throw new Error("useDonateModal must be used within a DonateModalProvider");
  }
  return context;
};

export const DonateModalProvider = ({ children }: { children: ReactNode }) => {
  const [openDonate, setOpenDonate] = useState(false);

  return (
    <DonateModalContext.Provider value={{ openDonate, setOpenDonate }}>
      {children}
    </DonateModalContext.Provider>
  );
};
