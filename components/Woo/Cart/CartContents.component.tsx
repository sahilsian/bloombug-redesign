/*eslint complexity: ["error", 20]*/
// Imports
import { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

// State
import { CartContext } from '../../../stores/CartProvider';

// Components
import Button from '../UI/Button.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

// Utils
import {
  getFormattedCart,
  getUpdatedItems,
  handleQuantityChange,
  IProductRootObject
} from '../../../lib/functions/functions';

// GraphQL
import { GET_CART } from '../../../lib/gql/woo_gql_queries';
import { UPDATE_CART } from '../../../lib/gql/woo_gql_mutations';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders cart contents.
 * @function CartContents
 * @returns {JSX.Element} - Rendered component
 */
const CartContents = () => {
  const router = useRouter();

  const { setCart } = useContext(CartContext);

  const isCheckoutPage = router.pathname === '/checkout';

  // Get cart data query
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data.cart.contents.nodes.length) {
        // Clear the localStorage if we have no remote cart

        localStorage.removeItem('woocommerce-cart');
        setCart(null);
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
        setTimeout(() => {
          refetch();
        }, 3000);
      },
    },
  );

  const handleRemoveProductClick = (
    cartKey: string,
    products: IProductRootObject[],
  ) => {
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            items: updatedItems,
          },
        },
      });
    }

    refetch();

    setTimeout(() => {
      refetch();
    }, 3000);
  };

  useEffect(() => {
    refetch();
    console.log(data)
  }, [refetch]);

  return (
    <section className="py-8 mt-10 pb-[200px]">
      <div className="container items-center mx-auto">
      <div className='mt-10 p-4 border-2 mx-auto'>

        {data?.cart?.contents?.nodes.length ? (
          data.cart.contents.nodes.map((item: IProductRootObject) => (
            <div>

                <div className='mb-10'>
                  <div className='font-bold py-5 pb-8 text-xl'>Your Cart</div>
                  <div className='flex-col gap-4'>
                    {data.cart.contents.nodes.map((item: IProductRootObject) => (
                      <div className='flex justify-between'>
                        <div className='flex gap-4'>
                          <div className='border-2 p-4'>
                            <Image alt={"cart image"} src={item.product.node.image.sourceUrl} width={150} height={150}></Image>
                          </div>
                          <div>
                            <div className="font-bold mb-5">
                              {item.product.node.name}
                            </div>
                            <div>
                              <div className='mb-2'>Quantity</div>
                              <input
                                className="border-2 p-3"
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(event) => {
                                  handleQuantityChange(
                                    event,
                                    item.key,
                                    data.cart.contents.nodes,
                                    updateCart,
                                    updateCartProcessing,
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="md:w-full lg:w-full xl:w-full text-xl mb-14">
                            {item.subtotal}
                          </div>
                          <div className=' cursor-pointer text-right'>
                            <div  onClick={() => {
                              handleRemoveProductClick(
                                item.key,
                                data.cart.contents.nodes,
                              )
                            }} className='border-2 p-2 flex items-center justify-center'>
                              <FontAwesomeIcon width={"24px"} height={"24px"} icon={faClose}></FontAwesomeIcon>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className=' mb-[40px]'>
                  <div className='mt-3 flex justify-between'>
                    <div>
                      <div className='text-zinc-400'>Sub Total</div>
                    </div>
                    <div>
                      <div className=''>{data?.cart?.total}</div>
                    </div>
                  </div>
                  {data?.cart?.discountTotal != '$0.00' &&
                    <div className='mt-3 flex justify-between'>
                      <div>
                        <div className='text-zinc-400'>Discount Total</div>
                      </div>
                      <div>
                        <div className='text-green-400'>{data?.cart?.total}</div>
                      </div>
                    </div>
                  }

                  {data?.cart?.totalTax &&
                    <div className='mt-3 flex justify-between'>
                      <div>
                        <div className='text-zinc-400'>Tax</div>
                      </div>
                      <div>
                        <div className=''>{data?.cart?.totalTax}</div>
                      </div>
                    </div>
                  }

                  {data?.cart?.shippingTotal &&
                    <div className='mt-3 flex justify-between'>
                      <div>
                        <div className='text-zinc-400'>Shipping</div>
                      </div>
                      <div>
                        <div className=''>{data?.cart?.shippingTotal}</div>
                      </div>
                    </div>
                  }

                  {data?.cart?.feeTotal &&
                    <div className='mt-3 flex justify-between'>
                      <div>
                        <div className='text-zinc-400'>Fees</div>
                      </div>
                      <div>
                        <div className=''>{data?.cart?.feeTotal}</div>
                      </div>
                    </div>
                  }

                  {data?.cart?.feeTotal &&
                    <div className='mt-3 flex justify-between'>
                      <div>
                        <div className='font-bold'>Total</div>
                      </div>
                      <div>
                        <div className='font-bold'>{data?.cart?.total}</div>
                      </div>
                    </div>
                  }



                </div>
                {updateCartProcessing && (
                  <div className="mt-4 w-full">
                    <div className="text-xl mx-auto text-center">
                      Updating count, please wait...
                      <LoadingSpinner />
                    </div>
                  </div>
                )}
                {!isCheckoutPage && data?.cart?.contents?.nodes.length ? (
                  <div className="mt-4 mx-auto">
                    <Link href="/" passHref>
                      <Button>Checkout</Button>
                    </Link>
                  </div>
                ) : null}
              </div>

          ))
        ) : (
          <div>
            <h1 className="text-2xl mx-auto mb-5">
              No products added in shopping cart.
            </h1>
            <div>
              <Link href="/products">
                <div className='p-4 text-center bg-blue-500 font-bold text-white'>
                  Shop Screens
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>


      </div>
    </section>
  );
};

export default CartContents;
