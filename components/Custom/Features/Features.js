export const Features = ({mainTitle='Title', featuresArray, color}) => {
    return (
        <div style={{backgroundColor: color}} class="p-12 rounded-xl m-12"> 
        <h4 className="max-sm:text-center text-[1.95rem] leading-[2.1rem] lg:text-[2.35rem] mb-5 font-[600] lg:leading-[3rem]">{mainTitle}</h4>    
        {featuresArray.map((feature)=>{
            return (
                <div className="border-b border-[#FFFFFF]">
                    <p className="max-sm:text-center text-[1.5rem] leading-[1.4] lg:leading-[1.6] lg:text-[1.725rem] mt-4 mb-0 pb-0"> {feature.featuretitle}</p>
                    <p className="max-sm:text-center text-[1rem] leading-[1.4] lg:leading-[1.6] lg:text-[1.1rem] mb-5 mt-2">{feature.featurecontent}</p>
                </div>
            )
        })}</div>    
    )
}