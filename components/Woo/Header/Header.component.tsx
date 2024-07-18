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
      <meta name="description" content="Greg Birring Coaching Store" />
      <meta name="keywords" content="Greg Birring Coaching - Greg Birring Coaching Store" />
      <meta
        property="og:title"
        content="Greg Birring Coaching Store"
        key="pagetitle"
      />
    </Head>
    <Navbar />
  </>
);

export default Header;
