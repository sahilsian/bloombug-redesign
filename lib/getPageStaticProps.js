import { gql } from "@apollo/client"
import client from "./client"
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks"
import { mapMainMenuItems } from "./mapMainMenuItems"

// This method is very important to the build process. This method makes a query to GET all pages and their metadata from the associated wordpress instance. The method will then return all props gathered from the request. All blocks will be cleaned to ensure consistency in the block renderer.

export const getPageStaticProps = async (context) => {
  const uri = context?.params?.slug ? `/${context.params.slug.join("/")}/` : "/"
  const { data } = await client.query({
    // $uri = the current page
    query: gql`
        query PageQuery($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              blocks
              seo {
                title
                metaDesc
                opengraphImage {
                  uri
                }
              }
            }
          }
          acfOptionsMainMenu {
            mainMenu {
              callToActionButton {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              menuItems {
                menuItem {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                }
                items {
                  destination {
                    ... on Page {
                      uri
                    }
                  }
                  label
                  subLabel
                  icon {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
        `,
    variables: {
      uri
    }
  })

  // if (!data?.nodeByUri || !data?.nodeByUri?.blocks) {
  //   return {
  //     notFound: true,
  //   };
  // };

  return {
    props: {
      // Page SEO passed
      seo: data.nodeByUri?.seo,
      // All Menu Items passed for that Page
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      // Cleaning all blocks to ensure consistency. All blocks passed
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks),
      // Call to Action Label/Destination passed
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    }
  }
}