// Components
import Layout from '../components/Woo/Layout/Layout.component';
import CartContents from '../components/Woo/Cart/CartContents.component';

// Types
import type { NextPage } from 'next';

const Handlekurv: NextPage = () => (
  <Layout title="Cart">
    <CartContents />
  </Layout>
);

export default Handlekurv;
