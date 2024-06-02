import Image from "next/image"

export const CarouselItem = ({title="Hello World", description, subtitle, image}) => {
    return (
        <div className="bg-[#FFFFFF] border-2 h-full rounded-md mb-3 p-6">
            <div className="max-w-[100px] mb-3">
                <Image className="rounded-lg shadow-lg" width={image.width} height={image.height} src={image.url} alt={image.alt}></Image>
                
            </div>
            <h3 className="text-[22px] font-semibold mb-0">{title}</h3>
            <h4 className="font-medium mb-2">{subtitle}</h4>
            <p className="">{description}</p>

        </div>
    )
}