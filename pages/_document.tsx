import { Html, Head, Main, NextScript } from 'next/document'
import StyledComponentsRegistry from '../lib/registry'
import { GoogleAnalytics } from '@next/third-parties/google'
import React from 'react'

export default function Document({ children }) {
  return (
    <Html style={{scrollBehavior:'smooth'}} lang="en">
      <Head>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
      </Head>
      <body id={'root'}>
        <Main />
        <NextScript />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </Html>
  )
}
