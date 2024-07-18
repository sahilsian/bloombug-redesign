import Image from "next/image";
import siteConfig from "../../../site.config";
import { CallToActionButton } from "../../Custom/CallToActionButton";
import Link from "next/link";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Heading } from "../../Core/Heading";
import { Paragraph } from "../../Core/Paragraph";
import { Label } from "../../Custom/Label";
import { useCallback, useEffect, useState } from "react";
import Cart from "../../Woo/Header/Cart.component";

export const MainMenu = ({ items, active, callToActionLabel, callToActionDestination, onClick }) => {
    const router = useRouter();

    const [scrollY, setScrollY] = useState('');

    const onScroll = useCallback(event => {
        const { scrollY } = window;
        setScrollY(scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll, { passive: true });
        }
    }, []);


    return (
        <div className={`m-auto fixed top-0 z-[1000] left-0 right-0 `}>
            <div style={{ backgroundColor: siteConfig.colors.solids.cover}} className={` transition-all m-auto w-full px-5`}>
                <div className={`max-w-[1400px] px-[0px] lg:px-[20px] mx-auto flex justify-between align-middle`}>
                    <div className="flex gap-8">
                        {/* Site Logo. Defined by logo.png */}
                        <Link href={"/"}>
                            <Image alt="Light Logo" className="my-7 lg:max-w-[150px] max-w-[100px]" width={200} height={63} objectFit="cover" src={'/logo.png'}></Image>
                        </Link>

                        {/* Nav Links */}
                        <div className={`flex max-[1020px]:hidden items-center`}>
                            <div className={`flex h-full text-center gap-6`}>
                                {items.map((item) => {
                                    return (
                                        <div className="relative item flex items-center py-8">
                                            <div style={{ fontWeight: router.pathname == item.destination ? "700" : "400" }} className={`py-2 flex items-center`}>
                                                <Link className={`link text-white flex items-center gap-1`} id={item.id} href={item.destination}>{item.label} {item.subMenuItem.length > 0 && <FontAwesomeIcon style={{ width: "12px", height: "12px" }} color={"#FFFFFF"} size="sm" icon={faChevronDown} />
                                                }</Link>
                                            </div>
                                            {item.subMenuItem.length > 0 && (
                                                <div className="subMenu absolute p-4 bg-white top-[90px] shadow-lg min-w-[600px] rounded-md">
                                                    {/* <div className="relative">
                                            <Image className={'absolute top-[-18px] right-0'} width={20} height={20} src={"./dropdown-accent.svg"}></Image>
                                        </div> */}
                                                    <div className="border-b-2 mb-2">
                                                        <Link href={item.destination} className="link">
                                                            <Label textWeight="600" fontSize="28px" content={item.label}></Label>
                                                        </Link>

                                                    </div>

                                                    <div>
                                                        {item.subMenuItem.map((subItem) => {
                                                            return (
                                                                <Link className="py-2 link flex gap-3 items-center" key={subItem.id} href={subItem.destination}>
                                                                    <div>
                                                                        {subItem.icon &&
                                                                        <Image src={subItem?.icon} height={25} width={25}></Image>
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                    <Label textWeight="400" content={subItem.label}></Label>
                                                                    <Label textColor="#747a80" content={subItem.subLabel}></Label>
                                                                    </div>

                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                        </div>)
                                })}

                            </div>
                            <Link href={"/products"}>
                            <div className="link text-white px-6">Shop</div>
                            </Link>



                        </div>
                        
                    </div>

                    {/* Call to Action */}
                    <div className="flex items-center max-[1020px]:hidden gap-5">
                        <Cart />
                        <div>
                            <CallToActionButton destination={callToActionDestination} buttonLabel={callToActionLabel} type="secondary"></CallToActionButton>
                        </div>
                    </div>

                    {/* Mobile Header Button */}
                    <div className="flex items-center gap-4 menu">
                        <Cart />
                        <div className="my-7 flex items-center cursor-pointer" onClick={onClick}>
                            <FontAwesomeIcon className="hover:opacity-80 transition-all" style={{ width: "24px", height: "24px" }} color={"#FFFFFF"} size="sm" icon={faBars} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}