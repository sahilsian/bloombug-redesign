/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from 'next-stripe/client'

// Components
import Billing from './Billing.component';
import CartContents from '../Cart/CartContents.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';


// GraphQL
import { GET_CART } from '../../../lib/gql/woo_gql_queries';
import { CHECKOUT_MUTATION } from '../../../lib/gql/woo_gql_mutations';
import { CartContext, Product } from '../../../stores/CartProvider';


// Utils
import {
  getFormattedCart,
  createCheckoutData,
  ICheckoutDataProps,
} from '../../../lib/functions/functions';
import { createTheOrder } from '../../../lib/utils/order';
import { getMetaData, getStripeLineItems } from '../../../lib/utils/checkout';
import Link from 'next/link';

export interface IBilling {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface IShipping {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface ICheckoutData {
  clientMutationId: string;
  billing: IBilling;
  shipping: IShipping;
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  isPaid: boolean;
  transactionId: string;
}

const CheckoutForm = () => {
  const { cart, setCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState<ICheckoutData | null>(null);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState<boolean>(false);
  const [isStripeOrderProcessing, setIsStripeOrderProcessing] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<ApolloError | null>(null);
  const [createdOrderData, setCreatedOrderData] = useState<any>({});
  const [orderCompleted, setorderCompleted] = useState<boolean>(false);
  const [isShippingBillingSame, setIsShippingBillingSame] = useState<boolean>(true)

  const handleStripeCheckout = async (input, products, setRequestError, setIsStripeOrderProcessing, setCreatedOrderData) => {
    setIsStripeOrderProcessing(true);
    // const orderData = getCreateOrderData(input, products);
    // const createCustomerOrder = await createTheOrder(orderData, setRequestError, '');

    const checkOutData = createCheckoutData(input, products);

    const createCustomerOrder = await createTheOrder(checkOutData, setRequestError, '')

    if(createCustomerOrder.orderId == null) {
      setRequestError('Clear Cart Failed')
      return null
    }

    console.log(checkOutData)

    // localStorage.removeItem('woo-session');
    // localStorage.removeItem('wooocommerce-cart');
    setorderCompleted(true);
    // setCart(null);

    setIsStripeOrderProcessing(false);


    setCreatedOrderData(createCustomerOrder)
    await createCheckoutSessionAndRedirect(products, input, createCustomerOrder?.orderId);

    return createCustomerOrder;
  }

  const createCheckoutSessionAndRedirect = async ( products: Product[], input:any, orderId:any ) => {

    const sessionData = {
        success_url: window.location.origin + `/order?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
        cancel_url: window.location.href,
        customer_email: input?.billing?.email,
        line_items: getStripeLineItems( products ),
        metadata: getMetaData( input, orderId ),
        payment_method_types: ['card'],
        mode: 'payment'
    }
    const session = await createCheckoutSession(sessionData)
    try {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        if (stripe) {
            stripe.redirectToCheckout({ sessionId: session.id });
        }
    } catch (error) {
        console.log( error );
    }
}


  // Get cart data query
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

  // Checkout GraphQL mutation
  const [checkout, { loading: checkoutLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      variables: {
        input: orderData,
      },
      onCompleted: () => {
        // localStorage.removeItem('woo-session');
        // localStorage.removeItem('wooocommerce-cart');
        // setorderCompleted(true);
        // setCart(null);
        refetch();
      },
      onError: (error) => {
        setRequestError(error);
        refetch();
      },
    },
  );

  useEffect(() => {
    if (null !== orderData) {
      // Perform checkout mutation when the value for orderData changes.
      checkout();
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  }, [checkout, orderData, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFormSubmit = async (submitData: any) => {
    if (submitData.paymentMethod == 'stripe') {
      const createdOrderData = await handleStripeCheckout(submitData, cart?.products, setRequestError, setIsStripeOrderProcessing, setCreatedOrderData);
      return null
    }

    const checkOutData = createCheckoutData(submitData, cart?.products);
    console.log(checkOutData)
    // setOrderData(checkOutData);
    setRequestError(null);
  };

  useEffect(() => {
    console.log(requestError)
  }, [requestError])

  return (
    <>
      {cart && !orderCompleted ? (
        <div className="w-full flex gap-6 flex-wrap">
          {/*Payment Details*/}
          <div className='flex-1'>

            <Billing isShippingBillingSame={isShippingBillingSame} handleFormSubmit={handleFormSubmit} />
            {/*Error display*/}
            {requestError && (
              <div className="h-32 text-xl text-center text-red-600">
                An error has occured.
              </div>
            )}
          </div>

          {/*	Order*/}
          <div className='flex-1 max-w-[400px]'>
            <CartContents />
            {/* Checkout Loading*/}
            {checkoutLoading && (
              <div className="text-xl text-center">
                Processing order, please wait...
                <LoadingSpinner />
              </div>
            )}
          </div>

        </div>
      ) : (
        <>
          {!cart && !orderCompleted && (
            <div>

            <h1 className="text-2xl m-12 mt-24 font-bold text-center">
              No products added to your shopping cart.
            </h1>
            <Link href="/products">
            <div className='p-4 text-center bg-blue-500 font-bold text-white'>
              Shop All Products
            </div>
            </Link>
          </div>

          )}
          {orderCompleted && (
            <div className="container h-24 m-12 mx-auto mt-24 text-xl text-center">
              You will be redirected to our secure payment screen shorly.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckoutForm;
