import Image from "next/image"
import siteConfig from "../../../site.config"
import { Heading } from "../../Core/Heading"
import { Spacer } from "../../Core/Spacer"
import { Paragraph } from "../../Core/Paragraph"

export const EventTemplate = () => {
    return (
        <div className="overflow-hidden relative flex justify-center">
            <div className="bg-[#11151c] w-full min-h-[780px] md:min-h-[960px] flex justify-center  py-[40px]">
                <div className="max-w-[1400px] absolute z-20 mx-auto px-4">
                    <Spacer height={"100px"}></Spacer>
                    <div className="w-full mb-4 flex justify-center">
                        <video width="500" height="500" autoPlay controls preload="none" poster="/retreat-tour.png">
                            <source src="/retreat.mp4" type="video/mp4" />

                            Your browser does not support the video tag.
                        </video>

                    </div>
                    <div className="max-w-[800px] mx-auto">
                        <Heading textAlign={"center"} textColor={"white"} level={1} content={"Join our Highly Anticipated Reiki Retreat Tour"}></Heading>
                        <Paragraph textAlign="center" textColor={"white"} content={"Join us for an enriching Reiki retreat, ideal for both experienced practitioners and those new to Reiki"}></Paragraph>
                    </div>
                    

                </div>
            </div>
            <div className={`w-[110%] h-[110%] top-[-20px] z-10 absolute`}>
                    <div style={{ '--cover-color': siteConfig.colors.solids.cover }} className="w-full cover-bg opacity-[90%] h-full absolute z-10"></div>
                    <Image alt="Cover Image" src={"/reiki-background.jpg"} objectFit="cover" fill className='absolute' />
                </div>
        </div>
    )
}