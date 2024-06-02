import { useState } from "react";
import siteConfig from "../../../site.config";
import Image from "next/image";
import { CallToActionButton } from "../../Custom/CallToActionButton";

export const PricingBlock = ({button_destination, title, price, description, discount, button_text, checklist}) => {
    const [yearly, setYearly] = useState(false)
    const [showAllItems, setShowAllItems] = useState(false);

    const visibleItems = showAllItems ? checklist : checklist.slice(0, 7);

    const toggleShowAllItems = () => {
        setShowAllItems(!showAllItems);
    };
    return (
        <div style={{borderColor: siteConfig.colors.solids.primary}} className="w-full border-2 rounded-xl">
            <div className="w-full p-5">
                <div className="max-w-[300px] mx-auto flex rounded-full bg-black w-full p-[3px]">
                    <div style={{backgroundColor: !yearly ? siteConfig.colors.solids.primary : "unset"}} onClick={()=>{setYearly(false)}} className="cursor-pointer flex-[1] font-bold text-white px-6 py-3 text-center rounded-full transition-all">
                        Monthly
                    </div>
                    <div style={{backgroundColor: yearly ? siteConfig.colors.solids.primary : "unset"}} onClick={()=>{setYearly(!yearly)}} className="cursor-pointer flex-[2] font-bold text-white px-6 py-3 text-center rounded-full transition-all">
                        Yearly<span className=" font-normal"> Save {100 * discount}%</span>
                    </div>
                </div>
                <div className=" text-center" onClick={()=>{setYearly(false)}}>
                    <span className="font-normal">
                        {!yearly ? 
                        <span className="font-bold text-[4.2rem]">${price}<span className=" font-thin text-sm">/ Month </span></span> 
                        : <span className="font-bold text-[4.2rem]">${(price*12)-((price*12) * discount)}<span className="font-thin text-sm">/ Year</span></span>}
                        </span>
                </div>
                <div>
                    <div className="text-center m-2 font-bold text-[2rem]"><h5>{title}</h5></div>
                </div>
                <div>
                    <div className="text-center mb-8 font-normal"><h5>{description}</h5></div>
                </div>
                <div className="mb-8">
                    {visibleItems.map((item) => {
                        return (
                            <div className="flex mb-2 justify-between font-medium">
                                <p>{item.title}</p>
                                {item.check_present == 1 ? 
                                <div className="max-w-[22px]">
                                
                                <Image 
                                objectFit="contain"
                                src="/checkbox.png"
                                width={100}
                                height={100}
                                alt="Checkbox image"
                                /> 
                                </div>
                                :
                                <div className="max-w-[22px]">
                                <Image 
                                objectFit="contain"
                                src="/Xmark.png"
                                width={100}
                                height={100}
                                alt="Xmark image"
                                />
                                </div>
                                }
                            </div>
                        )
                    })
                    }
                    <div style={{color: siteConfig.colors.solids.primary}} onClick={toggleShowAllItems} className="font-bold cursor-pointer">
                        {showAllItems ? "See Less" : "See More"}
                    </div>
                </div>
                <div className="mx-auto flex justify-center">
                    <CallToActionButton destination={button_destination} align="center" buttonLabel={button_text} type="primary"></CallToActionButton>
                </div>
            </div>
        </div>
    )
}