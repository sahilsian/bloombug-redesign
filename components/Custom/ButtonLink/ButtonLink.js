import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export const ButtonLink = ({destination, onClick, label, target = "_self", color, fontColor}) => {
    return <Link onClick={onClick} target={target} href={destination} style={{backgroundColor: color, color: fontColor}} className="btn font-semibold w-full">
    {label || ""}
    {/* <FontAwesomeIcon style={{paddingLeft: "20px", fontSize: "16px"}} size="16px" icon={faArrowRight}></FontAwesomeIcon> */}
    </Link>
}