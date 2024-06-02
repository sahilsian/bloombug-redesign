export const ListItem = ({content}) => {
    return (
        <div className="pl-7 mb-2" dangerouslySetInnerHTML={{ __html: content}}></div>
    )
}