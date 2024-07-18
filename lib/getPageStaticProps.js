import { gql } from "@apollo/client";
import client from "./client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  let data;
  const uri = context?.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
  
  const { data: pageData } = await client.query({
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
  });

  data = {
    seo: pageData.nodeByUri?.seo || null,
    mainMenuItems: mapMainMenuItems(pageData.acfOptionsMainMenu.mainMenu.menuItems),
    blocks: cleanAndTransformBlocks(pageData.nodeByUri?.blocks ),
    callToActionLabel: pageData.acfOptionsMainMenu.mainMenu.callToActionButton.label,
    callToActionDestination: pageData.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
  };


  return {
    props: { data }
  };

}
