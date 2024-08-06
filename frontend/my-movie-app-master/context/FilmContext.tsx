import { Film } from '@/types/film';
import React, { createContext, useContext, ReactNode, useState } from 'react';


interface FilmContextProps {
  currentFilm: Film | null;
  setCurrentFilm: (film: Film) => void;
}

const FilmContext = createContext<FilmContextProps | undefined>(undefined);

export const useFilmContext = () => {
  const context = useContext(FilmContext);
  if (!context) {
    throw new Error('useFilmContext must be used within a FilmProvider');
  }
  return context;
};

interface FilmProviderProps {
  children: ReactNode;
}

export const FilmProvider: React.FC<FilmProviderProps> = ({ children }) => {
  const [currentFilm, setCurrentFilm] = useState<Film | null>(null);

  return (
    <FilmContext.Provider value={{ currentFilm, setCurrentFilm }}>
      {children}
    </FilmContext.Provider>
  );
};
