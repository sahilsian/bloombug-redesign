/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';
// Utils
import { filteredVariantPrice, paddedPrice } from '../../../lib/functions/functions';
// Components
import AddToCart, { IProductRootObject } from './AddToCart.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

const SingleProduct = ({ product }: IProductRootObject) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVariation, setSelectedVariation] = useState<number>();
  const [tab, setTab] = useState<string>("Additional Information")

  const placeholderFallBack = 'https://via.placeholder.com/600';

  useEffect(() => {
    setIsLoading(false);
    if (product.variations) {
      const firstVariant = product.variations.nodes[0].databaseId;
      setSelectedVariation(firstVariant);
    }
  }, [product.variations]);

  let { description, shortDescription, stockQuantity, image, name, onSale, price, regularPrice, salePrice } =
    product;

  console.log(description)

  // Add padding/empty character after currency symbol here
  if (price) {
    price = paddedPrice(price, 'cad');
  }
  if (regularPrice) {
    regularPrice = paddedPrice(regularPrice, 'cad');
  }
  if (salePrice) {
    salePrice = paddedPrice(salePrice, 'cad');
  }


  console.log(product)

  return (
    <section className="py-8 bg-white mb-12 sm:mb-2">
      {/* Show loading spinner while loading, and hide content while loading */}
      {isLoading ? (
        <div className="h-56 mt-20">
          <p className="text-2xl font-bold text-center">Loading Products...</p>
          <br />
          <LoadingSpinner />
        </div>
      ) : (
        <div className=' pb-12 px-4'>

          <div className="container flex flex-wrap items-center pt-4 mx-auto ">
            <div className="grid grid-cols-1 gap-4 mt-16 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
              {image && (
                <img
                  id="product-image"
                  src={image.sourceUrl}
                  alt={name}
                  className="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:scale-105"
                />
              )}
              {!image && (
                <img
                  id="product-image"
                  src={
                    process.env.NEXT_PUBLIC_PLACEHOLDER_LARGE_IMAGE_URL ??
                    placeholderFallBack
                  }
                  alt={name}
                  className="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:shadow-lg hover:scale-105"
                />
              )}
              <div className="">
                <p className="text-3xl font-bold text-left">{name}</p>
                {/* Display sale price when on sale */}
                {onSale && (
                  <div className="flex">
                    <p className="pt-1 mt-4 text-3xl text-gray-900">
                      {product.variations && filteredVariantPrice(price, '')}
                      {!product.variations && salePrice}
                    </p>
                    <p className="pt-1 pl-8 mt-4 text-2xl text-gray-900 line-through">
                      {product.variations && filteredVariantPrice(price, 'right')}
                      {!product.variations && regularPrice}
                    </p>
                  </div>
                )}
                {/* Display regular price when not on sale */}
                {!onSale && (
                  <p className="pt-1 mt-4 text-2xl text-gray-900"> {price}</p>
                )}
                <p className="pt-1 mt-2 text-lg text-gray-900">
                  <p className='setHTML' dangerouslySetInnerHTML={{__html: shortDescription}}></p>
                </p>
                {Boolean(product.stockQuantity) && (
                  <p
                    v-if="data.product.stockQuantity"
                    className="pt-1 mt-4 mb-4 text-2xl text-gray-900"
                  >
                    {product.stockQuantity}
                  </p>
                )}
                {product.variations && (
                  <p className="pt-1 pb-4 mt-4 text-xl text-gray-900">
                    <div className="py-2 font-bold pb-4">Size</div>
                    <select
                      id="variant"
                      name="variant"
                      className="block w-full px-6 py-4 bg-white border border-gray-500 rounded-lg focus:outline-none focus:shadow-outline"
                      onChange={(e) => {
                        setSelectedVariation(Number(e.target.value));
                      }}
                    >
                      {product.variations.nodes.map(
                        ({ id, name, databaseId, stockQuantity }) => {
                          // Remove product name from variation name
                          const filteredName = name.split('- ').pop();
                          return (
                            <option key={id} value={databaseId}>
                              {filteredName} - ({stockQuantity} in stock)
                            </option>
                          );
                        },
                      )}
                    </select>
                  </p>
                )}
                <div className="pt-1 mt-2">
                  {
                    // Display default AddToCart button if we do not have variations.
                    // If we do, send the variationId to AddToCart button
                  }
                  {product.variations && (
                    <AddToCart
                      product={product}
                      variationId={selectedVariation}
                    />
                  )}
                  {!product.variations && <AddToCart product={product} />}
                </div>
              </div>
            </div>
          </div>
          <div className='flex gap-7 mt-10'>
              <div onClick={()=> setTab("Additional Information")} className={`text-xl py-4 ${tab == 'Additional Information' ? "border-b-blue-500 border-b-2" : "border-b-slate-500 border-b-2"} cursor-pointer`}>
                Additional Information
              </div>
              <div onClick={()=> setTab("Related Products")} className={`text-xl py-4 ${tab == 'Related Products' ? "border-b-blue-500 border-b-2" : "border-b-slate-300 border-b-2"} cursor-pointer`}>
                Related Products
              </div>
          </div>
          <div className='py-4'>
            {tab === "Additional Information" && 
              <div>
                <p className="pt-1 mt-2 text-lg text-gray-900">
                  <p className='setHTML' dangerouslySetInnerHTML={{__html: description}}></p>
                </p>
              </div>
            }
            {tab === "Related Products" && 
              <div>
                No Related Products Found
              </div>
            }
          </div>
        </div>

      )}

    </section>
  );
};

export default SingleProduct;
