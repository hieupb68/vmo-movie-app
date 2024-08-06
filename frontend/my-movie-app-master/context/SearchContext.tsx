import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchModalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModalContext = createContext<SearchModalContextProps | undefined>(undefined);

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error('useSearchModal must be used within a SearchModalProvider');
  }
  return context;
};

export const SearchModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <SearchModalContext.Provider value={{ open, setOpen }}>
      {children}
    </SearchModalContext.Provider>
  );
};
