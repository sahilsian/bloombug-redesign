import siteConfig from "../../../site.config"

export const Textarea = ({...rest}) => {
    return (
        <div style={{borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px"}} className="py-3 mb-3 text-sm w-full outline-none outline-0 bg-white px-5 rounded-[4px] ">
        <textarea {...rest} className="!outline-none min-h-[100px] bg-transparent w-full" />
        </div>
    )
}