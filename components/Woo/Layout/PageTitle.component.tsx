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
    className={`container mx-auto pt-12  bg-white`}
  >
    <div>
      {/* 
      // @ts-ignore */}
      <h1 className="text-[3rem]">{title}</h1>

    </div>
  </section>
);

export default PageTitle;
