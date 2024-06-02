import Image from "next/image"

export const Logos = ( { logo_1, logo_2, logo_3, logo_4, logo_5, logo_6 } ) => {
    return (
        <div className="flex justify-center items-center gap-20 flex-wrap">
            {
                logo_1.url && (
                    <div>
                        <Image src={logo_1.url} width={logo_1.width} height={logo_1.height} alt={logo_1.alt}></Image>
                    </div>
                )
            }
            {
                logo_2.url && (
                    <div>
                        <Image src={logo_2.url} width={logo_2.width} height={logo_2.height} alt={logo_2.alt}></Image>
                    </div>
                )
            }
            {
                logo_3.url && (
                    <div>
                        <Image src={logo_3.url} width={logo_3.width} height={logo_3.height} alt={logo_3.alt}></Image>
                    </div>
                )
            }
            {
                logo_4.url && (
                    <div>
                        <Image src={logo_4.url} width={logo_4.width} height={logo_4.height} alt={logo_4.alt}></Image>
                    </div>
                )
            }
            {
                logo_5.url && (
                    <div>
                        <Image src={logo_5.url} width={logo_5.width} height={logo_5.height} alt={logo_5.alt}></Image>
                    </div>
                )
            }
            {
                logo_6.url && (
                    <div>
                        <Image src={logo_6.url} width={logo_6.width} height={logo_6.height} alt={logo_6.alt}></Image>
                    </div>
                )
            }

        </div>
    )
}