import { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';

import Layout from '../components/Woo/Layout/Layout.component';

import client from '../lib/client';

import { FETCH_ALL_CATEGORIES_QUERY } from '../lib/gql/woo_gql_queries';
import Category from '../components/Woo/Category/Categories.component';

/**
 * Category page displays all of the categories
 */
const Categories: NextPage = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Categories">
    {categories && <Category categories={categories} />}
  </Layout>
);

export default Categories;

export const getStaticProps: GetStaticProps = async () => {
  const result = await client.query({
    query: FETCH_ALL_CATEGORIES_QUERY,
  });

  return {
    props: {
      categories: result.data.productCategories.nodes,
    },
    revalidate: 10,
  };
};
