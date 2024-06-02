import siteConfig from '../../../site.config'
import React from "react";
import Slider from "react-slick";

export const ScrollingBullets = ({ bullets }) => {
    const settings = {
        className: "slider variable-width flex justify-center gap-[50px] flex-nowrap overflow-hidden",
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 15000,
        autoplaySpeed: 0,
        arrows: false,
        cssEase: "linear",
        autoplay: true,
        variableWidth: true,
        swipeToSlide: false
      };


    return (
        <div style={{backgroundColor: siteConfig.colors.texts.secondary}} className="py-7">
            {/* hello world */}
            <Slider {...settings}>
            
            {bullets.map((item)=> {
                return (
                    <div className='!flex items-center gap-4'>
                        <div className='w-[20px] h-[20px] bg-white rounded-sm'>
                        </div>
                        <div className='text-white tracking-wider inline text-nowrap font-bold uppercase'>{item.bullet}
                        </div>
                    </div>
                )
            })}
            </Slider>
        </div>
    )
}