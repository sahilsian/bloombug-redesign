export const Column = ({ children, padding, bgColor = "none", width, verticalAlignment, layout, className }) => {
    let columnAlignment;
    switch(verticalAlignment) {
        case "center" : {
            columnAlignment = "center";
            break;
        }
        case "bottom" : {
            columnAlignment = 'flex-end';
            break;
        }
        default : {
            columnAlignment = 'flex-start';
        }
    }
    return <div data-aos="fade-up" 
    style={{
    width: width, 
    backgroundColor: bgColor, 
    justifyContent: columnAlignment, 
    paddingBottom: padding ? padding.bottom : "0px", 
    paddingTop: padding ? padding.top : "0px", 
    paddingLeft: padding ? padding.left : "0px", 
    paddingRight: padding ? padding.right : "0px"
    }}
    className={`${className} column h-full overflow-hidden box-border mx-auto flex ${width ? "" :"flex-1"} flex-col`}
    >
        <div style={{display: 'flex', justifyContent:  layout ? layout.justifyContent : "initial"}}>
            <div className="w-full h-full" style={{maxWidth: layout ? layout.contentSize : "none"}}>
                {children}
            </div>
        </div>
    </div>
}