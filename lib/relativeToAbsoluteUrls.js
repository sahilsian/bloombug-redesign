// Strucutring links such that they can fit directly into paragraph/text bodies. Embedded links
export const relativeToAbsoluteUrls = (htmlString = "") => {
    return htmlString.split(process.env.NEXT_PUBLIC_WORDPRESS_URL).join("");
}