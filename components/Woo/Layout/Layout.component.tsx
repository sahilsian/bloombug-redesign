// Imports
import { ReactNode, useContext, useEffect } from 'react';
// Components
import Header from '../Header/Header.component';
import PageTitle from './PageTitle.component';
import Footer from '../Footer/Footer.component';
import Stickynav from '../Footer/Stickynav.component';

// State
import { CartContext } from '../../../stores/CartProvider';

// Utils
import { getFormattedCart } from '../../../lib/functions/functions';

// GraphQL
import { GET_CART } from '../../../lib/gql/woo_gql_queries';
import { useQuery } from '@apollo/client';

interface ILayoutProps {
  children?: ReactNode;
  title: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({ children, title }: ILayoutProps) => {

  const { setCart } = useContext(CartContext);

  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data?.cart?.contents?.nodes.length) {
        // Should we clear the localStorage if we have no remote cart?

        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);


  return (
    <>
      <Header title={title} />
      <div className='max-w-[1400px] p-4 mx-auto'>
        <PageTitle title={title} />
      {children}
      </div>
      
      <Footer />
      <Stickynav />
    </>
  );
};

export default Layout;
