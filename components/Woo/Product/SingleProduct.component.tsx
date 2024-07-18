/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useEffect } from 'react';
import { parse } from 'node-html-parser';
// Utils
import { filteredVariantPrice, paddedPrice } from '../../../lib/functions/functions';
// Components
import AddToCart, { IProductRootObject } from './AddToCart.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';
import Image from 'next/image';

const SingleProduct = ({ product }: IProductRootObject) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVariation, setSelectedVariation] = useState<number>();
  const [selectedVartiationUI, setSelectedVariationUI] = useState<any>();
  const [tab, setTab] = useState<string>("Additional Information");

  const placeholderFallBack = 'https://via.placeholder.com/600';

  useEffect(() => {
    setIsLoading(false);
    if (product.variations) {
      const firstVariant = product.variations.nodes[0].databaseId;
      setSelectedVariation(firstVariant);
    }
  }, [product.variations]);

  let { description, shortDescription, galleryImages, stockQuantity, image, name, onSale, price, regularPrice, salePrice } =
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
        <div className="">
          <p className="text-2xl font-bold text-center">Loading Product...</p>
          <br />
          <LoadingSpinner />
        </div>
      ) : (
        <div className=' pb-12 '>

          <div className="container mx-auto ">
            <div className="flex gap-8 flex-wrap">
              <div className='flex-1 minw300'>
                <div>
                  {image && (
                    <Image
                      id="product-image"
                      src={image.sourceUrl}
                      alt={name}
                      width={800}
                      height={800}
                      className="h-auto transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:scale-[102%]"
                    />
                  )}
                  {!image && (
                    <Image
                      id="product-image"
                      src={
                        process.env.NEXT_PUBLIC_PLACEHOLDER_LARGE_IMAGE_URL ??
                        placeholderFallBack
                      }
                      alt={name}
                      width={800}
                      height={800}
                      className="h-auto transition duration-500 ease-in-out transform hover:grow hover:shadow-lg hover:scale-102"
                    />
                  )}
                </div>

                <div>
                  {galleryImages && (
                    <div className='flex gap-3 px-2'>
                      {galleryImages.nodes.map((img) => {
                        return (
                          <div>
                            <Image
                              src={img.sourceUrl}
                              width={100}
                              height={100}
                              alt='Gallery Node'
                            >
                            </Image>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 minw300">
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
                  <p className='setHTML' dangerouslySetInnerHTML={{ __html: shortDescription }}></p>
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
                    <div className="py-2 font-bold pb-4">Select an Option</div>
                    <select
                      id="variant"
                      name="variant"
                      className="block w-full px-6 py-4 bg-white border border-gray-500 rounded-lg focus:outline-none focus:shadow-outline"
                      onChange={(e) => {
                        setSelectedVariation(Number(e.target.value));
                      }}
                    >
                      {product.variations.nodes.map(
                        (item) => {
                          // Remove product name from variation name
                          console.log(item)
                          return (
                            <option key={item.id} value={item.databaseId}>
                              {item.name.split(' - ')[1]} {item.onSale ? item.salePrice : item.regularPrice}
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
          <div className='flex gap-7 mt-[150px]'>
            <div onClick={() => setTab("Additional Information")} className={`text-xl py-4 ${tab == 'Additional Information' ? "border-b-blue-500 border-b-2" : "border-b-slate-500 border-b-2"} cursor-pointer`}>
              Additional Information
            </div>
            <div onClick={() => setTab("Related Products")} className={`text-xl py-4 ${tab == 'Related Products' ? "border-b-blue-500 border-b-2" : "border-b-slate-300 border-b-2"} cursor-pointer`}>
              Related Products
            </div>
          </div>
          <div className='py-4'>
            {tab === "Additional Information" &&
              <div>
                <p className="pt-1 mt-2 text-lg text-gray-900">
                  <p className='setHTML' dangerouslySetInnerHTML={{ __html: description }}></p>
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
