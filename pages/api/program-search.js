import { gql } from "@apollo/client"
import client from "../../lib/client"

const handler = async (req, res) => {
    try {
        const { data } = await client.query({
            query: gql`
                query AllPostsQuery {
                    programs {
                        nodes {
                        databaseId
                        uri
                        title
                        featuredImage {
                            node {
                            uri
                            sourceUrl
                            }
                        }
                        programProperties {
                            metaDescription
                            metaTitle
                            image {
                                id
                                link
                            }
                        }
                        }
                    }
                } 
            `
        })
        return res.status(200).json({
            programs: data.programs.nodes
        })

    } catch (e) {
        return res.status(400).json({
            error: "An error has occured, please try again."
        })
    }

}

export default handler