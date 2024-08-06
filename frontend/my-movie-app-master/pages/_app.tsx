import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { FilmTypeProvider } from "../context/FilmTypeContext";
import { DarkModeProvider } from "../context/DarkModeContext";
import { FilmProvider } from "../context/FilmContext";
import React, { useEffect } from "react";
import { SearchModalProvider } from "../context/SearchContext";
import { DonateModalProvider } from "@/context/DonateContext";
import DonateModal from "@/components/composite/modal/DonateModal";
import SearchModal from "@/components/composite/modal/SearchModal";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/context/AuthContext";


export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  const router = useRouter()

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <AuthProvider>
          <DarkModeProvider>
            <FilmProvider>
              <FilmTypeProvider>
                <SearchModalProvider>
                  <DonateModalProvider>
                    <Component {...pageProps} />
                    <DonateModal />
                    <SearchModal />
                  </DonateModalProvider>
                </SearchModalProvider>
              </FilmTypeProvider>
            </FilmProvider>
          </DarkModeProvider>
        </AuthProvider>
      </SessionProvider>
    </Provider>
  );
}
