import Head from 'next/head';

import Navbar from './Navbar.component';

interface IHeaderProps {
  title: string;
}

/**
 * Renders header for each page.
 * @function Header
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Header = ({ title }: IHeaderProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content="Bloom Bug Screens Store" />
      <meta name="keywords" content="Bloom Bug Screens, Bloom Bug Screens Store" />
      <meta
        property="og:title"
        content="Bloom Bug Screens Store"
        key="pagetitle"
      />
    </Head>
    <Navbar />
  </>
);

export default Header;
