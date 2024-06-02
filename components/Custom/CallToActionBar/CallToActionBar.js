import Image from "next/image"
import siteConfig from "../../../site.config"
import { Heading } from "../../Core/Heading"
import { Paragraph } from "../../Core/Paragraph"
import Link from "next/link"

export const CallToActionBar = ({ title, paragraph, image, button_text, button_destination, onlineImage }) => {
    return (
        <div style={{ backgroundColor: siteConfig.colors.solids.primary }} className="w-full p-10 rounded-xl flex-wrap-reverse gap-5 flex">
            <div className="min-w-[250px] flex-[2]">
                <div className=" max-w-[600px]">
                    <Heading textAlign={"left"} level={3} textColor={"white"} content={title}></Heading>
                </div>
                <Paragraph content={paragraph} textColor={"#FFFFFF"} fontSize="18px"></Paragraph>
                <div className="items-center justify-center sm:justify-start flex-wrap flex max-[800px]:items-start max-[800px]:flex-col gap-5">
                    {onlineImage && (
                        <div className="mb-1 flex-1 mx-auto sm:mx-0 max-w-[150px]">
                            <Image width={onlineImage.width} height={onlineImage.height} src={onlineImage.url}
                            alt={onlineImage.alt}
                            ></Image>
                        </div>
                    )}
                    <Link className="flex-1 w-full sm:max-w-[300px] block" href={button_destination}>
                        <div className="rounded-[300px] text-[14px] lg:text-[16px] hover:opacity-80 cursor-pointer font-[300] bg-white flex items-center px-8 py-3 justify-center">
                            <div className="w-[17px] bg-green-500 rounded-full mr-3 h-[17px]"></div>

                            {button_text}
                        </div>
                    </Link>

                </div>


            </div>
            <div className="flex-1 min-w-[250px] mobilehidden flex justify-center items-center"></div>
        </div>
    )
}