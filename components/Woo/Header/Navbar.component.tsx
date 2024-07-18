// Imports
import Link from 'next/link';

// Components
import Cart from './Cart.component';
import AlgoliaSearchBox from '../AlgoliaSearch/AlgoliaSearchBox.component';
import MobileSearch from '../AlgoliaSearch/MobileSearch.component';

// Utils
import useIsMobile from '../../../lib/hooks/useIsMobile';

import Image from 'next/image';
import siteConfig from '../../../site.config';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <header>
      <nav style={{backgroundColor: siteConfig.colors.solids.cover}}  id="header" className="top-0 z-50 w-full py-1 ">
        <div className="container max-w-[1400px] flex md:flex-wrap flex-col md:flex-row items-center justify-between px-4 py-3 mx-auto mt-0 md:min-w-96">
          
          <div
            className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
            id="menu"
          >
            <Link href={"/"}>
            <Image alt='Logo' src={"/logo.png"} width={150} height={80}></Image>
            </Link>
            <ul className="items-center px-12 justify-between pt-4 text-base text-white md:flex md:pt-0">
            <li>
                <Link href="/">
                  <span className="inline-block py-2 pr-4 text-lg no-underline hover:underline">
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products">
                  <span className="inline-block py-2 pr-4 text-lg no-underline hover:underline">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <span className="inline-block py-2 pr-4 text-lg no-underline hover:underline">
                    Categories
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="flex items-center order-2 md:order-3 w-full md:w-auto"
            id="nav-content"
          >
            <AlgoliaSearchBox />
            <MobileSearch />
            {!isMobile && <Cart />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
