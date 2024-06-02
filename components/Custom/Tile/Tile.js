import { Heading } from "../../Core/Heading"
import { CallToActionButton } from "../../Custom/CallToActionButton"

export const Tile = ({title='Title', text='Body text', buttonText='Button Text', colour='blue', textColour='white'}) => {
    return(
        <div style={{backgroundColor: colour}} className="h-96 flex flex-col gap-2 justify-center w-1/3 text-center mx-6 p-12 rounded-xl">
            
                <Heading textAlign={"center"} level={3} textColor={textColour} content={title} ></Heading>
                <div style={{color: textColour}} className="mb-4">
                    {text}
                </div>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <CallToActionButton destination={'./'} buttonLabel={buttonText} type="secondary" className="w-1/2"></CallToActionButton>
                    </div>
                </div>
                
                
        </div>
    );
}