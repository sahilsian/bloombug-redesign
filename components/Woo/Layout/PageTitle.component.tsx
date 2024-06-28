import { Heading } from "../../Core/Heading";
import { Paragraph } from "../../Core/Paragraph";

interface IPageTitleProps {
  title: string;
  marginLeft?: boolean;
}

/**
 * Renders page title for each page.
 * @function PageTitle
 * @param {boolean} marginLeft - Adds extra margin left if true
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */
const PageTitle = ({ title, marginLeft }: IPageTitleProps) => (
  <section
    className={`container mx-auto mt-24 text-center bg-white`}
  >
    <div>
      {/* 
      // @ts-ignore */}
      <Heading textAlign={"left"} level={1} content={`${title}`}/>
    </div>
  </section>
);

export default PageTitle;
