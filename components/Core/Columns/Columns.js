export const Columns = ({ isStackedOnMobile, children, className, padding }) => {
    return <div className="max-w-[1400px] w-full columns mx-auto">
        <div style={{
            paddingBottom: padding ? padding.bottom : "0px", 
            paddingTop: padding ? padding.top : "0px", 
            paddingLeft: padding ? padding.left : "0px", 
            paddingRight: padding ? padding.right : "0px"
        }} className={`columns ${className} overflow-hidden mx-auto gap-5 justify-between w-full flex-wrap ${isStackedOnMobile ? "block md:flex" : "flex"}`}>{children}</div>
    </div>
}