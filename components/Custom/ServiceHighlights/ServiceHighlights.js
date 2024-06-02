import Image from "next/image"
import siteConfig from "../../../site.config";
import { getFontSizeForHeading } from "../../../lib/fonts";
import Link from "next/link";

export const ServiceHighlights = ({image, title, description, destination}) => {
    console.log(image)
    return (
        <Link href={destination}>
            <div className="relativebg-[#fad] w-full rounded-lg h-[400px] overflow-hidden">
                <div className="relative w-full h-full">
                    <Image src={image.url} fill></Image>
                    <div style={{backgroundColor: siteConfig.colors.solids.cover + "B3" }} className="absolute w-full h-full z-10 hover:opacity-0 transition-all"></div>
                </div>
                <div className="absolute bottom-0 z-20 p-6">
                    <div>
                        <h4 className={`${getFontSizeForHeading(6)} text-white`}>{title}</h4>
                        <p className={`text-white text-[16px]`}>{description}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}