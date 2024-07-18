import {useState, useEffect, useContext} from "react";
import Router from "next/router";
import Link from 'next/link';
import axios from "axios";
import { CartContext } from "../../../stores/CartProvider";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.component";
import Button from "../UI/Button.component";

export const Order = () => {
    const {cart, setCart} = useContext(CartContext)
    const [isSessionFetching, setSessionFetching] = useState(false);
    const [sessionData, setSessionData] = useState({});
    const session_id = process.browser ? Router.query.session_id : null;

    useEffect(() => {
        setSessionFetching(true);
        if (process.browser) {
            localStorage.removeItem('woo-session');
            localStorage.removeItem('wooocommerce-cart');
            setCart(null);

            if (session_id) {
                axios.get(`/api/get-stripe-session/?session_id=${session_id}`)
                    .then((response) => {
                        setSessionData(response?.data ?? {});
                        console.log(response.data)
                        console.log(response)
                        setSessionFetching(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setSessionFetching(false);
                    });
            }
        }

    }, [session_id]);

    return (
        <div>
            <div className="h-almost-screen">
            <div className="w-600px mt-10 m-auto">
                {isSessionFetching ? <div className="text-xl mx-auto text-center">
                    Loading
                    <LoadingSpinner />
                  </div> : (
                    <>
                        <h2 className="mb-6 text-xl"><span>Thank you for placing the order.</span></h2>

                        <p className="mb-3">Order:</p>
                        

                        <p className="mb-3">Order Details:</p>
                        <table className="table-auto w-full text-left whitespace-no-wrap mb-8">
                            <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="px-4 py-3">Order Number</td>
                                <td className="px-4 py-3">{sessionData?.metadata?.orderId}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">Email</td>
                                <td className="px-4 py-3">{sessionData?.customer_details?.email}</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3">Name</td>
                                <td className="px-4 py-3">{sessionData?.customer_details?.name}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Link href={"/products"}>
                        <Button >Shop More</Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
        </div>
    )
}