import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import siteConfig from "../../../site.config"
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import Link from "next/link"

export const ShowScroll = ({id_name}) => {
    return (
        <Link href={`#${id_name}`}>
        <div style={{color: siteConfig.colors.solids.primary}} className="font-bold text-center flex-col flex items-center justify-center gap-2 cursor-pointer hover:opacity-70 transition-all">
            <span className=" shadow-2xl">Scroll for More</span>
            <FontAwesomeIcon className=" shadow-2xl" icon={faChevronCircleDown} width={24} height={24}></FontAwesomeIcon>
        </div>
        </Link>

    )
}