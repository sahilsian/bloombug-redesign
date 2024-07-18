import { useFormContext } from "react-hook-form";
import siteConfig from "../../../site.config";

const ShippingForm = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <div>
            <div className="flex items-center gap-3 mb-4">
                <div className="border-2 flex items-center justify-center w-[50px] h-[50px] rounded-full">1.</div>
                <h3 className="text-xl">Shipping Details</h3>
            </div>
            <div className='flex mb-4 gap-2'>
                <div className='w-full'>
                    <div className='mb-2'>First Name<span className='text-red-600'>*</span></div>
                    <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                        <input id="firstName" {...register("firstName")} name={"firstName"} placeholder={"First Name"} required className="!outline-none py-4  w-full bg-transparent " />
                    </div>
                    {errors.firstName && <p className="text-red-600">{errors.firstName.message as string}</p>}
                </div>
                <div className='w-full'>
                    <div className='mb-2'>Last Name <span className='text-red-600'>*</span></div>
                    <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                        <input id="lastName" {...register("lastName")} name={"lastName"} placeholder={"Last Name"} required className="!outline-none py-4  w-full bg-transparent " />
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <div className='mb-2'>Email <span className='text-red-600'>*</span></div>
                <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                    <input id="email" {...register("email")} type="email" name={"email"} placeholder={"Email"} required className="!outline-none py-4  w-full bg-transparent " />
                </div>
            </div>

            <div className='mb-4'>
                <div className='mb-2'>Phone Number <span className='text-red-600'>*</span></div>
                <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                    <input id="phone" type="tel" name={"phone"} placeholder={"Phone Number"} required
                        {...register("phone")} className="!outline-none py-4  w-full bg-transparent " />
                </div>
            </div>

            <div className='mb-4'>
                <div className='mb-2'>Country <span className='text-red-600'>*</span></div>
                <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="py-4 mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                    <select
                        id="country"
                        name='country' className='bg-transparent w-full' required aria-placeholder='Country'
                        {...register("country")}
                    >
                        <option>Canada</option>
                        <option>United States</option>
                    </select>
                </div>
            </div>
            <div className='w-full ]'>
                <div className='mb-2'>Address <span className='text-red-600'>*</span></div>
                <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                    <input id="address1" name={"address1"} placeholder={"Address Line"} required {...register("address1")} className="!outline-none py-4  w-full bg-transparent " />
                </div>
            </div>
            <div className='flex mb-4 gap-2'>
                <div className='w-full '>
                    <div className='mb-2'>City<span className='text-red-600'>*</span></div>
                    <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                        <input id="city" name={"city"} placeholder={"City"} required {...register("city")} className="!outline-none py-4  w-full bg-transparent " />
                    </div>
                </div>
                <div className='w-full'>
                    <div className='mb-2'>Province/State <span className='text-red-600'>*</span></div>
                    <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                        <input id="state" name={"state"} placeholder={"Province/State"} {...register("state")} className="!outline-none py-4  w-full bg-transparent " />
                    </div>
                </div>
            </div>
            <div className='w-full '>
                <div className='mb-2'>Post Code<span className='text-red-600'>*</span></div>
                <div style={{ borderColor: siteConfig.colors.solids.cover, color: siteConfig.colors.texts.secondary, borderWidth: "2px" }} className="mb-2 text-black text-sm w-full outline-none outline-0 bg-white px-6 rounded-[4px] ">
                    <input id="postcode" name={"postcode"} placeholder={"Post Code"} required {...register("postcode")} className="!outline-none py-4  w-full bg-transparent " />
                </div>
            </div>

        </div>
    )
}

export default ShippingForm