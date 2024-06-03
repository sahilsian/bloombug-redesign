import { InlineWidget } from "react-calendly";

export const Calendly = ({calendlyURL}) => {
    return (
        <div id="calendly-embed" style={{overflow: 'hidden'}}>
            <InlineWidget url={calendlyURL} />
        </div>
    )
}