import React from "react";
import Slider from "react-slick";
import { CarouselItem } from "./CarouselItem";

export const Carousel = ({ data, visibleitems=4 }) => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: visibleitems,
        slidesToScroll: visibleitems,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: visibleitems,
                    slidesToScroll: visibleitems,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container mx-auto max-w-[1400px] p-4">
        <Slider {...settings}>
          {data.map((item) => {
            return (
                <div className="h-full">
                    <CarouselItem subtitle={item.subtitle} description={item.description} title={item.title} image={item.image}>
                    </CarouselItem>
                </div>
            )
          })}
        </Slider>
      </div>
    )
}