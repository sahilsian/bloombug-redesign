import { gql } from "@apollo/client";
import client from "./client";
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";
import { mapMainMenuItems } from "./mapMainMenuItems";

export const getPageStaticProps = async (context) => {
  let data;
  const uri = context?.params?.slug ? `/${context.params.slug.join("/")}/` : "/";
  
  if (uri.startsWith("/product/")) {
    const productId = context?.params?.id;
    const { data: productData } = await client.query({
      query: gql`
        query ProductQuery($id: Da!) {
          product(id: $id, idType: DATABASE_ID) {
            id
            databaseId
            averageRating
            seo {
                title
                metaDesc
                opengraphImage {
                  uri
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
        id: productId
      }
    });

    data = {
      product: productData.product,
      seo: productData.nodeByUri?.seo,
      mainMenuItems: mapMainMenuItems(productData.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: productData.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: productData.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
    };
  } else {
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
              shop {
                destination {
                  ... on Page {
                    uri
                  }
                }
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
      shop: pageData.acfOptionsMainMenu.mainMenu.shop.destination.uri
    };

    console.log(data)
  }

  return {
    props: { data }
  };
};
