import { AppProps } from 'next/app'
import { ApolloProvider } from "@apollo/client";
import client from '../lib/client';
import '../styles/index.css'
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
import siteConfig from '../site.config';


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return <><NextNProgress color={siteConfig.colors.solids.accent} /> <div className="font-body"><Component {...pageProps} /></div></>
}

export default MyApp
