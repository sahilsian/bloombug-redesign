import Image from "next/image"
import { Heading } from "../../Core/Heading"
import { Paragraph } from "../../Core/Paragraph"
import { CallToActionButton } from "../CallToActionButton"

export const Card = ( {image, title, description, showbutton, call_to_action, destination} ) => {
    return (
        <div className="w-full shadow-xl rounded-md border-[1px]">
            <div className="max-h-[200px] overflow-hidden">
                <Image src={image.url} width={image.width} height={image.height} alt={image.alt} className='w-full'></Image>
            </div>
            <div className="p-6">
                <Heading textAlign={'center'} level={5} content={title}></Heading>
                <Paragraph textAlign={"center"} content={description}></Paragraph>
                {showbutton == 1 ?
                <div className="max-w-[200px] mx-auto">
                <CallToActionButton buttonLabel={call_to_action} destination={destination}></CallToActionButton>
                </div>
                :
                <></>
                }
                
            </div>
        </div>
    )
}