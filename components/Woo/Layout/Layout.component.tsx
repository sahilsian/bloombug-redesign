// Imports
import { ReactNode, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

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
  return (
    <>
      <Header title={title} />
      <div className='max-w-[1400px] mx-auto'>
        <PageTitle title={title} />
      {children}
      </div>
      
      <Footer />
      <Stickynav />
    </>
  );
};

export default Layout;
