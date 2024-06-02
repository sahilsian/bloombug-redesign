import Image from "next/image"
import { Heading } from "../../Core/Heading"
import { Paragraph } from "../../Core/Paragraph"
import { useRouter } from "next/router"
import Link from "next/link"

export const Services = ({ data }) => {
    const router = useRouter();
    return (
        <div className="flex flex-wrap gap-6 overflow-hidden">
            {data.map((item) => {
                return (
                    <Link
                        style={{
                            backgroundColor: item.color
                        }}
                        href={item.button_destination ? item.button_destination : `${router.pathname}#${item.id_destination}`}
                        className="flex-1 w-full rounded-[6px] min-w-[340px] border-[2px] w-full max-sm:items-center max-sm:flex-col-reverse p-6 hover:opacity-85 cursor-pointer transition-all flex ">
                        <div className="flex-1 flex flex-col justify-between w-full h-full">
                            <div >
                                <Heading content={item.title} textColor={item.text_color} level={5}></Heading>
                                <Paragraph textColor={item.text_color} content={item.description}></Paragraph>
                            </div>

                            <span style={{ color: item.text_color, borderColor: item.text_color, border: "2px solid" }} className="max-sm:text-center block p-3 border-1 font-semibold rounded-lg  text-center">{item.buttontext}</span>
                        </div>
                        {/* <div className="mt-4 p-3 w-full max-w-[100px] flex-1">
                            <Image height={item.image.height} width={item.image.width} src={item.image.url}></Image>
                        </div> */}
                    </Link>
                )
            })}
        </div>
    )
}