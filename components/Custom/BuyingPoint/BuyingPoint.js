export const BuyingPoint = ({number, color="#FFFFFF", description}) => {
    return (
        <div className="max-[600px]:text-center" style={{color: color}}>
            <div className={"max-[600px]:mx-auto max-w-[150px] pb-2 sm:pb-4 mb-2 sm:mb-4"} style={{borderBottom: "3px solid", borderBottomColor: color}}>
                <h4 className={"text-[22px] sm:text-[20px]"}>{number}</h4>
            </div>
            <div className={"text-[12px] sm:text-[14px]"}>
                <p>{description}</p>
            </div>
        </div>
    )
}