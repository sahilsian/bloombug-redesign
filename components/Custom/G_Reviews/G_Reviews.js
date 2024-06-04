import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import siteConfig from "../../../site.config"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

export const G_Reviews = ({ reviews }) => {
    return (
        <div className="flex flex-wrap gap-5 items-stretch justify-center">
            {reviews.map((item) => {
                var count = parseInt(item.count)

                return (
                    <div style={{ borderColor: siteConfig.colors.solids.primary }} className="p-5 border-2 w-full rounded-md flex-1 max-w-[400px] min-w-[320px] flex gap-4 flex-col justify-between">
                        <div >
                            <div className="flex text-lg mb-4">
                                <div className="pr-3">
                                    {count.toFixed(1)}
                                </div>
                                {
                                    [...Array(count)].map((i) => {
                                        return (<FontAwesomeIcon icon={faStar} color="#EABC1B" width={"20px"}></FontAwesomeIcon>)
                                    })
                                }
                            </div>
                            <div className="text-[13px] opacity-60">
                                {item.review}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-3 items-center text-[14px] font-medium">
                            <Image alt="user image" src={item.profile} height={30} width={30}></Image>
                            {item.name}
                            </div>
                            <div>
                                <Image alt="google logo" width={30} height={30} src={'/google-logo.png'}></Image>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}