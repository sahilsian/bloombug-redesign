import { AppProps } from 'next/app'
import { ApolloProvider, gql } from "@apollo/client";
import client from '../lib/client';
import '../styles/index.css'
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import AOS from "aos";
import "aos/dist/aos.css";
import React from 'react';
import siteConfig from '../site.config';
import { CartProvider } from '../stores/CartProvider';
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <ApolloProvider client={client}>
      <NextNProgress color={siteConfig.colors.solids.accent} />
      <div className="font-body">
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>

      </div>

    </ApolloProvider>
  )
}

export default MyApp
