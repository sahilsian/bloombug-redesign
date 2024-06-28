/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { filteredVariantPrice, paddedPrice } from '../../../lib/functions/functions';

interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const DisplayProducts = ({ products }: IDisplayProductsProps) => (
  <section className="container mx-auto bg-white pb-[200px]">
    <div id="product-container" className="flex flex-wrap items-center">
      {products ? (
        products.map(
          ({
            databaseId,
            name,
            price,
            regularPrice,
            salePrice,
            onSale,
            slug,
            image,
            variations,
          }) => {
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

            return (
              <div
                key={uuidv4()}
                className="flex flex-col p-6 md:w-1/2 xl:w-1/4"
              >
                <Link
                  href={`/products/${encodeURIComponent(
                    slug,
                  )}?id=${encodeURIComponent(databaseId)}`}
                >
                  <span>
                    {image ? (
                      <img
                        id="product-image"
                        className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                        alt={name}
                        src={image.sourceUrl}
                      />
                    ) : (
                      <img
                        id="product-image"
                        className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105"
                        alt={name}
                        src={
                          process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
                        }
                      />
                    )}
                  </span>
                </Link>

                <Link
                  href={`/products/${encodeURIComponent(
                    slug,
                  )}?id=${encodeURIComponent(databaseId)}`}
                >
                  <span>
                    <div className="flex justify-center pt-3">
                      <p className="font-bold text-center cursor-pointer">
                        {name}
                      </p>
                    </div>
                  </span>
                </Link>
                {/* Display sale price when on sale */}
                {onSale && (
                  <div className="flex justify-center">
                    <div className="pt-1 text-gray-900">
                      {variations && filteredVariantPrice(price, '')}
                      {!variations && salePrice}
                    </div>
                    <div className="pt-1 ml-2 text-gray-900 line-through">
                      {variations && filteredVariantPrice(price, 'right')}
                      {!variations && regularPrice}
                    </div>
                  </div>
                )}
                {/* Display regular price when not on sale */}
                {!onSale && (
                  <p className="pt-1 text-center text-gray-900">{price}</p>
                )}
              </div>
            );
          },
        )
      ) : (
        <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
          No products found.
        </div>
      )}
    </div>
  </section>
);

export default DisplayProducts;
