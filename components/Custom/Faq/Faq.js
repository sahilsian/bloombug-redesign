import { useState } from "react"
import { getFontSizeForHeading } from "../../../lib/fonts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import siteConfig from "../../../site.config"

export const Faq = ( {list} ) => {
    const [active, setActive] = useState(0)
    return (
        <div className="mx-auto border-2 p-5 rounded-lg">
            <h3 className={`${getFontSizeForHeading(3)}`}>Frequently Asked Questions</h3>
            {list.map((item, id) => {
                return (
                    <div key={id} className="py-3">  
                        <div onClick={()=> {
                                setActive(active == id ? null : id)
                            }} style={{ color: (active == id && siteConfig.colors.solids.primary)}} className={` text-[22px] py-1 select-none cursor-pointer flex justify-between`}>
                            <div>
                                {item.question}
                            </div>
                            <div>
                                {active == id ?
                                <FontAwesomeIcon icon={faChevronUp} width={20}></FontAwesomeIcon>
                                :
                                <FontAwesomeIcon icon={faChevronDown} width={20}></FontAwesomeIcon>
                                }
                            </div>
                            
                        </div>
                        <div className={`${(active == id ? "block" : "hidden")}`}>
                            {item.answer}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}