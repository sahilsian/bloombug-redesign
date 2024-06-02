import Image from "next/image"
import siteConfig from "../../../site.config"
import { getFontSizeForHeading } from "../../../lib/fonts"

export const Benefits = ({ benefits }) => {
    console.log(benefits)
    return (
        <div className="flex justify-stretch flex-wrap w-full sm:grid sm:grid-cols-2 md:grid md:grid-cols-3 gap-4">
            {benefits.map((item) => {
                return (
                    <div style={{backgroundColor: siteConfig.colors.solids.primary}} className="p-5 shadow-2xl w-full rounded-md text-white min-w-[320px] flex flex-col justify-center items-center">
                        <div className="max-w-[40px] max-h-[40px] mb-8">
                            <Image src={item.icon.url} width={item.icon.width} height={item.icon.height}></Image>
                        </div>
                        <div className="text-center">
                            <h6 className={`${getFontSizeForHeading(6)}`}>{item.title}</h6>
                            <p className={`${getFontSizeForHeading("p")}`}>{item.description}</p>
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}