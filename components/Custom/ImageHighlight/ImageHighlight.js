import Image from "next/image"
import { useParallax } from "react-scroll-parallax";
import { Heading } from "../../Core/Heading";
import siteConfig from "../../../site.config";
import { HeadingLabel } from "../HeadingLabel";
import { Paragraph } from "../../Core/Paragraph";
import { CallToActionButton } from "../CallToActionButton";

export const ImageHighlight = ({image, imageWidth, imageHeight, title="hello world", paragraph="lorem ipsum dolor",imageAlt, row_1, row_2, row_3 }) => {
    const direction = {
        right: 'row',
        left: 'row-reverse'
    }
    const parallaxImage = useParallax({
        speed: -10,
    });

    const parallaxCol = useParallax({
        speed: 3,
    });
    {/* style={{flexDirection: direction[align]}} */}
    return (
        <div className="relative  md:flex w-full overflow-hidden">
           <div className={"w-full flex max-h-[700px] overflow-hidden"}>
                <div className="flex-[1.3] max-[970px]:hidden max-[970px]:flex=[0.5] max-[1250px]:flex-1 max-[1075px]:flex-[0.75]">
                </div>
                <div className="flex-1">
                    <Image className="max-[970px]:w-[110%] max-[540px]:w-[100%] max-[540px]:h-[200%] max-[970px]:h-[110%]" ref={parallaxImage.ref} objectPosition={"bottom"} width={imageWidth} height={imageHeight} objectFit="cover" src={image} alt={imageAlt}>
                    </Image>
                </div>
            </div>
            <div className="absolute top-0 w-full h-full">
                <div className="max-w-[1400px] max-[970px]:justify-center mx-auto w-full h-full flex relative items-center">
                    <div className="flex relative items-center w-full h-full max-w-[600px] max-[970px]:m-4 max-[1280px]:max-w-[400px] ">
                        {/* <div className="absolute hidden  left-0">
                            <Image width={text_backdropWidth} height={text_backdropHeight} src={text_backdrop}
                            alt={text_backdropAlt}
                            ></Image>
                        </div> */}
                        <div className="absolute bg-[#FFFFFFE9]  max-[128px]:bg-transparent rounded-lg p-5" ref={parallaxCol.ref}>
                            {/* <HeadingLabel textAlign={"left"} color={siteConfig.colors.solids.primary} content={accent}></HeadingLabel> */}
                            <Heading content={title} level={5} textColor={siteConfig.colors.texts.secondary}></Heading>
                            <Paragraph textColor={siteConfig.colors.texts.secondary} content={paragraph}></Paragraph>
                            <div className=" border-b-2 pb-4 border-b-black font-bold mb-5">
                                {row_1}
                            </div>
                            <div className=" border-b-2 pb-4 border-b-black font-bold mb-5">
                                {row_2}
                            </div>
                            <div className=" border-b-2 pb-4 border-b-black font-bold mb-5">
                                {row_3}
                            </div>
                            {/* <CallToActionButton type="primary" buttonLabel={buttonText} destination={destination}></CallToActionButton> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}