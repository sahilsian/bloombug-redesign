// Components
import Layout from '../components/Woo/Layout/Layout.component';
import CheckoutForm from '../components/Woo/Checkout/CheckoutForm.component';

// Types
import type { NextPage } from 'next';

const Checkout: NextPage = () => (
  <Layout title="Checkout">
    <CheckoutForm />
  </Layout>
);

export default Checkout;
