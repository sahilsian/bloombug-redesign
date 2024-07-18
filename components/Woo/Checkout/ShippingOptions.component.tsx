import React, { useContext, useState } from 'react'
import { useFormContext } from "react-hook-form";
import { CartContext } from '../../../stores/CartProvider';
import { useQuery } from '@apollo/client';
import { GET_CART } from '../../../lib/gql/woo_gql_queries';
import { getFormattedCart } from '../../../lib/functions/functions';

interface IShippingOptions {

}

const ShippingOptions = ({}: IShippingOptions) => {
    const { cart, setCart } = useContext(CartContext);

    const { register } = useFormContext();
    const { data, refetch } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
          // Update cart in the localStorage.
          console.log("CHECK", data)
          const updatedCart = getFormattedCart(data);
    
          if (!updatedCart && !data.cart.contents.nodes.length) {
            localStorage.removeItem('woo-session');
            localStorage.removeItem('wooocommerce-cart');
            setCart(null);
            return;
          }
    
          localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));
    
          // Update cart data in React Context.
          setCart(updatedCart);
        },
    });

    
    
    return (
        <div className='border-[1px] p-4 mt-4'>
            
            <div className='font-bold mb-2'>
                Select a Shipping Option
            </div>

            <div className='flex gap-2 mb-2'>
                <input {...register("shipping")}  defaultChecked type='radio' required name="shipping" value={"pickup"}></input>
                <span>Pickup: Free <span className='text-gray-400'>(3-5 day processing)</span></span>
            </div>
            <div className='text-sm'>Please allow 3-5 days for your order to be processed. For pickup options, please pickup at our physical location: </div>
            <div className='text-sm'>1100 Lansdowne Dr Unit G, Coquitlam, BC V3B 5E2</div>

        </div>
    )
}

export default ShippingOptions