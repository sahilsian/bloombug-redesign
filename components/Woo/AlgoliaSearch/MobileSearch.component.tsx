import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { useState } from 'react';

import SearchResults from './SearchResults.component';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? 'changethis',
  process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API_KEY ?? 'changethis',
);

/**
 * Algolia search for mobile menu.
 */
const MobileSearch = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [hasFocus, sethasFocus] = useState<boolean>(false);
  return (
    <div className="mt-4 mb-4 md:hidden w-full">
      <InstantSearch
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? 'changeme'}
        searchClient={searchClient}
      >
        <SearchBox
          translations={{
            submitTitle: 'Search',
            resetTitle: 'Reset Search',
            placeholder: 'Search for Products',
          }}
          className={`px-4 py-2 text-base w-full bg-white border outline-none rounded ${
            hasFocus ? 'border-black' : 'border-gray-400'
          }`}
          onReset={() => {
            setSearch(null);
          }}
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            sethasFocus(true);
            setSearch(target.value);
          }}
          onKeyDown={(event) => {
            const target = event.target as HTMLInputElement;
            sethasFocus(true);
            setSearch(target.value);
          }}
        />
        {search && <Hits hitComponent={SearchResults} />}
      </InstantSearch>
    </div>
  );
};

export default MobileSearch;
