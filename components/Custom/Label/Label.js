import { getTextAlign } from "../../../lib/fonts"
import { relativeToAbsoluteUrls } from "../../../lib/relativeToAbsoluteUrls"

export const Label = ({textAlign = 'left', content, textColor="#000000", textWeight="300", className, fontSize='16px'}) => {
    return (
        <p style={{fontWeight: textWeight, color: textColor, textAlign: textAlign, fontSize: fontSize}}>{content}</p>
    )
}