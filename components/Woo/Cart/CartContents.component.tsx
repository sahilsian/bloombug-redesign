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
      console.log(data)
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
  }, [refetch]);

  return (
    <section className="flex-1 minw300 pb-[100px]">
      <div className="container items-center mx-auto">
        <div className='p-4 border-2 mx-auto'>

          {data?.cart?.contents?.nodes.length ? (
            <div>

              <div className='mb-10'>
                <div className='font-bold py-5 pb-8 text-xl'>Your Cart</div>
                <div className='flex-col flex gap-4'>
                  {data.cart.contents.nodes.map((item: IProductRootObject) => (
                    <div>
                      {isCheckoutPage ?
                        <div className=' border-2 p-4'>
                          <div className='w-full'>
                            <div className=' mb-auto'>
                              <Image className='w-full h-full object-cover' alt={"cart image"} src={item.product.node.image.sourceUrl} width={600} height={600}></Image>
                            </div>
                            <div className='w-full mt-3 text-center'>
                              <div className="font-medium">

                                {item.product.node.name}: <span className='font-light'>{item.variation.node.name}</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex mt-5 justify-between items-center'>
                            <div>
                              <div className='mb-2 text-xs'>Quantity</div>
                              <input
                                className="border-2 max-w-[100px] md:max-w-[100px] w-full p-2"
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
                            <div className=' flex h-full  items-center cursor-pointer text-right'>
                              <div onClick={() => {
                                handleRemoveProductClick(
                                  item.key,
                                  data.cart.contents.nodes,
                                )
                              }} className='border-2 p-2 flex items-center justify-center max-w-[22px]'>
                                <FontAwesomeIcon width={"24px"} height={"24px"} icon={faClose}></FontAwesomeIcon>
                              </div>
                            </div>

                          </div>
                          <div className=" mt-4 flex justify-between">
                            <div>
                              <div className='text-zinc-400'>Price</div>
                            </div>
                            <div>
                              <div className=''>{item.subtotal}</div>
                            </div>
                          </div>
                        </div>
                        :
                        <div className='flex justify-between gap-4 border-b-[1px] pb-4'>
                          <div className='flex gap-4 w-full'>
                            <div className=' mb-auto'>
                              <Image className='min-w-[100px] max-w-[250px] w-full h-full object-cover' alt={"cart image"} src={item.product.node.image.sourceUrl} width={300} height={300}></Image>
                            </div>
                            <div className='max-w-[170px] md:max-w-[300px] w-full'>
                              <div className="font-medium">

                                {item.product.node.name}: <span className='font-light'>{item.variation.node.name}</span>
                              </div>
                              <div>
                              </div>
                              <div>
                                <div className='mb-2 text-xs mt-5'>Quantity</div>
                                <input
                                  className="border-2 max-w-[70px] md:max-w-[70px] w-full p-2"
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
                          <div className='flex flex-col items-end'>
                            <div className="md:w-full lg:w-full xl:w-full text-xl mb-14">
                              {item.subtotal}
                            </div>
                            <div className=' cursor-pointer text-right'>
                              <div onClick={() => {
                                handleRemoveProductClick(
                                  item.key,
                                  data.cart.contents.nodes,
                                )
                              }} className='border-2 p-2 flex items-center justify-center max-w-[22px]'>
                                <FontAwesomeIcon width={"24px"} height={"24px"} icon={faClose}></FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className=' mb-[40px]'>
                <div className='border-b-[1px] mb-7'></div>
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
                      <div className=''>{data?.cart?.total}</div>
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
                  <Link href="/checkout" passHref>
                    <Button>Checkout</Button>
                  </Link>
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <h1 className="text-2xl mx-auto mb-5">
                No products added in shopping cart.
              </h1>
              <div>
                <Link href="/products">
                  <div className='p-4 text-center bg-blue-500 font-bold text-white'>
                    Shop All Products
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
