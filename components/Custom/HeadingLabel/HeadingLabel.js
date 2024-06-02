import { getFontSizeForHeading } from "../../../lib/fonts"

export const HeadingLabel = ({ textAlign, color, content}) => {
    return (
        <div className="mb-2">
            <h4 style={{
                color: color,
                textTransform: "uppercase"
            }} className={`text-${textAlign} ${getFontSizeForHeading("label")}`}>{content}</h4>
        </div>
    )
}