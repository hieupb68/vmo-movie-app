import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
interface Props {
  meta?: {
    title: string;
    description: string;
  };
  children?: React.ReactNode;
  noindex?: boolean;
}

const Layout = ({ children, meta, noindex = false }: Props) => {

  return (
    <>
      <Head>
        <meta
          name="robots"
          content={
            noindex ? 'noindex, nofollow' : 'index, follow'
          }
        />
        <meta charSet="UTF-8" />
        <meta name="google" content="notranslate" />
        <meta name="yandex-verification" content="556d2c4c4767a8f1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{meta?.title}</title>
        <link rel="icon" href="https://w7.pngwing.com/pngs/958/942/png-transparent-television-film-cinema-popcorn-popcorn-television-food-film-thumbnail.png" />
        <meta name="description" content={meta?.description} />
        <meta itemProp="name" content={meta?.title} />
        <meta name="twitter:title" content={meta?.title} />
        <meta name="twitter:description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:site_name" content={meta?.title} />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
