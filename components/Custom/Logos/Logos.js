import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

export const Logos = ( { logo_1, logo_1_link, logo_2, logo_2_link, logo_3, logo_3_link, logo_4, logo_4_link, logo_5, logo_5_link, logo_6, logo_6_link } ) => {
    const router = useRouter()
    return (
        <div className="flex justify-center items-center opacity-85 gap-10 flex-wrap">
            {
                logo_1.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_1_link || router.asPath}>
                        <Image src={logo_1.url} width={logo_1.width} height={logo_1.height} alt={logo_1.alt}></Image>
                        </Link>

                    </div>
                )
            }
            {
                logo_2.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_2_link || router.asPath}>
                        <Image src={logo_2.url} width={logo_2.width} height={logo_2.height} alt={logo_2.alt}></Image>
                        </Link>
                    </div>
                )
            }
            {
                logo_3.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_3_link || router.asPath}>
                        <Image src={logo_3.url} width={logo_3.width} height={logo_3.height} alt={logo_3.alt}></Image>
                        </Link>
                    </div>
                )
            }
            {
                logo_4.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_4_link || router.asPath}>
                        <Image src={logo_4.url} width={logo_4.width} height={logo_4.height} alt={logo_4.alt}></Image>
                        </Link>
                    </div>
                )
            }
            {
                logo_5.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_5_link || router.asPath}>
                        <Image src={logo_5.url} width={logo_5.width} height={logo_5.height} alt={logo_5.alt}></Image>
                        </Link>
                    </div>
                )
            }
            {
                logo_6.url && (
                    <div className="min-w-[100px] max-w-[150px] flex justify-center">
                        <Link target="_blank" href ={logo_6_link || router.asPath}>
                        <Image src={logo_6.url} width={logo_6.width} height={logo_6.height} alt={logo_6.alt}></Image>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}