import Image from "next/image"
import { useState } from "react";

export const Highlights = ({ title_heading, title_explanation, checklist_descriptions = [], image_area, subtitlebold }) => {
    return (
        <div className="flex flex-col items-center w-full bg-white">
            <div className="flex flex-col md:flex-row flex-1 w-full max-w-7xl mx-auto px-5 pt-5">
                <div className="order-2 md:order-1 flex-1 flex justify-center items-center px-10 mb-10 md:mb-0">
                    {/* order to image first then text layout per boss orders*/}
                    <Image
                        src={image_area.url}
                        alt="Macbook Image"
                        width={image_area.width} 
                        height={image_area.height}
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
                <div className="order-2 md:order-1 flex-1 flex flex-col justify-center items-start pl-1 md:pl-10">
                    <ul className="text-lg text-gray-800">
                        {checklist_descriptions.map((item, index) => (

                            <li key={index} className="mb-4 flex">

                                <div className="flex items-start">
                                    
                                    <div className="bg-blue-500 w-14 h-14 flex items-center justify-center mr-12 ml-2 text-4xl rounded-md" style={{ minWidth: '3.75rem', minHeight: '3.75rem' }}>
                                        <span className="text-white font-bold">{index + 1}.</span>
                                    </div>

                                    <div>
                                        {item.subtitlebold && <strong>{item.subtitlebold}</strong>}
                                        {item.description}
                                    </div>   

                                </div>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};