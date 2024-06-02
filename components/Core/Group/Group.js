export const Group = ({ children, bgColor, contentSize, padding, className="group", border, justification="center", radius="0px" }) => {

    const justify = {
        left: 'flex-start',
        right: 'flex-end',
        center: 'center',
        initial: 'center'
    }

    return (
        <div className={`parent-group flex w-full h-full`} style={{justifyContent: justify[justification]}}>
            <div className={`group ${className} w-full h-full overflow-auto box-border`} 
            style={{
                backgroundColor: bgColor, 
                maxWidth: contentSize, 
                borderRadius: radius,
                paddingBottom: padding ? padding.bottom : "0px", 
                paddingTop: padding ? padding.top : "0px", 
                paddingLeft: padding ? padding.left : "0px", 
                paddingRight: padding ? padding.right : "0px", 
                borderColor: border ? border.color : "none", 
                borderWidth: border ? border.width : "none"}}
            >
                {children}
            </div>
        </div>

    )
}