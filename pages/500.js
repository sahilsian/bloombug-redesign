import Image from "next/image";
import { getFontSizeForHeading } from "../lib/fonts";
import siteConfig from "../site.config";
import Link from "next/link";
import React from 'react'
import { CallToActionButton } from "../components/Custom/CallToActionButton";

export default function Custom500() {
    return (
        <div style={{ backgroundColor: siteConfig.colors.solids.cover }} className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div>
                <div className="max-w-[150px] mx-auto">
                    <Link href={"/"}>
                        <Image alt="Light Logo" className="my-7" width={200} height={63} objectFit="cover" src={'/logo.png'}></Image>
                    </Link>
                </div>
                <h1 className={`${getFontSizeForHeading(1)}`} style={{ color: siteConfig.colors.solids.secondary }}>404 Page Not Found</h1>
                <div>
                    <CallToActionButton align="center" destination={"/"} buttonLabel={"Return Home"}></CallToActionButton>
                </div>
            </div>
        </div>
    )
}