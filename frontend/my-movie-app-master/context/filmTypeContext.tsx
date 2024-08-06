import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilmTypeContextProps {
  filmType: string | null;
  setFilmType: (type: string | null) => void;
}

const FilmTypeContext = createContext<FilmTypeContextProps | undefined>(undefined);

export const useFilmType = () => {
  const context = useContext(FilmTypeContext);
  if (!context) {
    throw new Error('useFilmType must be used within a FilmTypeProvider');
  }
  return context;
};

interface FilmTypeProviderProps {
  children: ReactNode;
}

export const FilmTypeProvider: React.FC<FilmTypeProviderProps> = ({ children }) => {
  const [filmType, setFilmType] = useState<string | null>(null);

  return (
    <FilmTypeContext.Provider value={{ filmType, setFilmType }}>
      {children}
    </FilmTypeContext.Provider>
  );
};
