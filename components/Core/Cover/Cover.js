import Image from "next/image"
import { useRouter } from "next/router"
import { useParallax } from "react-scroll-parallax";
import siteConfig from "../../../site.config";


export const Cover = ({children, background, className}) => {
    const router = useRouter()
    const parallaxColumns = useParallax({
        speed: -9,
      });

    const parallaxImage = useParallax({
    speed: 5,
    });

    return (
        <div style={{ '--primary-color': siteConfig.colors.solids.primary }} className={`${className} primary-bg overflow-hidden h-[900px] relative flex`}>
            <div ref={parallaxColumns.ref} className={`w-full z-20 pt-[120px] md:pt-[200px] lg:pt-[200px]`}>
            {children}
            </div>
            <div className={`w-[110%] h-[110%] top-[-20px] absolute`}>
                <div style={{ '--cover-color': siteConfig.colors.solids.cover }}  className="w-full cover-bg opacity-[80%] h-full absolute z-10"></div>
                <Image ref={parallaxImage.ref} alt="Cover Image" src={background} objectFit="cover" fill className='absolute' />
            </div>

        </div>
    )
}