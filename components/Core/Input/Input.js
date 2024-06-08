import siteConfig from "../../../site.config"

export const Input = ({...rest}) => {
    return (
        <div style={{borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px"}} className="py-4 mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
        <input {...rest} className="!outline-none w-full bg-transparent " />
        </div>
    )
}