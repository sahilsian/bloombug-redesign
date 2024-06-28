// Components
import DisplayProducts from '../components/Woo/Product/DisplayProducts.component';
import Layout from '../components/Woo/Layout/Layout.component';

// GraphQL
import { FETCH_ALL_PRODUCTS } from '../lib/gql/woo_gql_queries';

// Utilities
import client from '../lib/client';

// Types
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';

/**
 * Displays all of the products.
 * @function HomePage
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Products: NextPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Products">
    {products && <DisplayProducts products={products} />}
  </Layout>
);

export default Products;

export const getStaticProps: GetStaticProps = async () => {
  const { data, loading, networkStatus } = await client.query({
    query: FETCH_ALL_PRODUCTS,
  });

  return {
    props: {
      products: data.products.nodes,
      loading,
      networkStatus,
    },
    revalidate: 60,
  };
};
