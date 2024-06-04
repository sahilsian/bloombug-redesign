import { MainMenu } from './MainMenu'
import { BlockRenderer } from "../BlockRenderer"
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Analytics } from '@vercel/analytics/react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Footer } from './Footer';
import { useEffect, useState } from 'react';
import siteConfig from '../../site.config';
import Link from 'next/link';
import React from 'react';
import { CallToActionButton } from '../Custom/CallToActionButton';

export const Page = (props) => {
    const router = useRouter()
    const [active, setActive] = useState(false)

    useEffect(()=> {
        setActive(false)
    }, [router.reload])

    return (
        <div className={`font-heading`}>
            <Head>
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
                <title>{props.seo.title}</title>
                <meta name='description' content={props.seo.metaDesc}></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"></meta>
                <link
                    rel="stylesheet"
                    type="text/css"
                    charset="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-
            awesome.min.css" rel="stylesheet" integrity="sha384-
            wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                    crossorigin="anonymous"></link>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <meta property="og:url" content={`${router.asPath}`}></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content={props.seo.title}></meta>
                <meta content={siteConfig.texts.sitename} property="og:site_name"></meta>
                <meta property="og:description" content={props.seo.metaDesc}
                ></meta>
                <meta name="theme-color" content={siteConfig.colors.solids.primary}></meta>
                <meta property="og:image" content={props.seo.opengraphImage?.uri || "/opengraph-default.png"}></meta>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                <meta name="twitter:card" content="summary_large_image"></meta>
                <meta property="twitter:domain" content={siteConfig.texts.siteurl}></meta>
                <meta property="twitter:url" content={`${router.asPath}`}></meta>
                <meta name="twitter:title" content={props.seo.metaDesc}></meta>
                <meta name="twitter:description" content={props.seo.metaDesc}></meta>
                <meta name="twitter:image" content={props.seo.opengraphImage?.uri || "/opengraph-default.png"}></meta>
            </Head>
            <GoogleAnalytics gaId="G-CHR0TKY6LB" />
            <div className='relative overflow-hidden w-full '>
                <div style={{width: active ? "300px" : "0px", transition: "width 0.2s", backgroundColor: siteConfig.colors.solids.cover}} className='fixed h-[200%] overflow-hidden z-[50]'>
                    <div className='pt-[120px] px-[20px]'>

                    {/* Mobile Menu */}
                    {props.mainMenuItems.map((item) => {
                        return (
                            <div>
                            <div style={{opacity: active ? "100" : "0", transition: '0.3s opacity ease'}} className='text-white'>
                                <Link className='block text-[18px] pb-3 mb-2' href={item.destination}>
                                    {item.label}
                                </Link>
                                
                            </div>
                            {item.subMenuItem.map((subitem) => {
                                return (
                                    <div style={{opacity: active ? "100" : "0", transition: '0.3s opacity ease'}}>
                                        <Link className='block text-white font-[200] text-[15px] pl-5 pb-3 mb-2' href={subitem.destination}>
                                    {subitem.label}
                                    </Link>
                                    </div>
                                )
                                })}
                            </div>
                        )
                    })}
                    </div>
                    <div style={{opacity: active ? "100" : "0", transition: '0.3s all ease'}} className='p-4'>
                        <CallToActionButton destination={props.callToActionDestination} buttonLabel={props.callToActionLabel} type="primary"></CallToActionButton>
                    </div>

                </div>
                <div >
                    {/* All Site Content */}

                    <MainMenu active={active} onClick={()=> {
                        setActive(!active);
                        
                    }} items={props.mainMenuItems} callToActionLabel={props.callToActionLabel} callToActionDestination={props.callToActionDestination}></MainMenu>
                    <Analytics></Analytics>
                    <ParallaxProvider>
                        <BlockRenderer items={props.mainMenuItems} blocks={props.blocks}></BlockRenderer>
                    </ParallaxProvider>
                    <Footer callToActionLabel={props.callToActionLabel} callToActionDestination={props.callToActionDestination} items={props.mainMenuItems}></Footer>
                </div>
            </div>


        </div>
    )
}