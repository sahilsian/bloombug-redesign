import Image from "next/image";
import siteConfig from "../../../site.config";
import { CallToActionButton } from "../../Custom/CallToActionButton";
import { HeadingLabel } from "../HeadingLabel";
import { Heading } from "../../Core/Heading";

export const ImageText = ({title, header, description, button_text, button_destination, image}) => {

    return (
        <div className="flex w-full">
            <div className="flex flex-[1.5] justify-center items-center w-full">
                <div className=" max-w-[500px] ">
                <HeadingLabel 
                        textAlign={"left"}
                        color={siteConfig.colors.solids.primary}
                        content={title}>

                </HeadingLabel>
                <Heading content={header} level={3}>

                </Heading>
                <div className="mb-6">
                    <Heading content={description} level={"p"}>
                    </Heading>
                </div>   
                
                <CallToActionButton destination={button_destination} align="left" buttonLabel={button_text} type="primary"></CallToActionButton>
        
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center w-full ">
                <div className="cursor-pointer">
                <Image 
                    objectFit="contain"
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                />
                </div>
            </div> 
        </div>
    )
}