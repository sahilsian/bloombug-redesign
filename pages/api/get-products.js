import client from "../../lib/client"
import { FETCH_ALL_PRODUCTS } from "../../lib/gql/woo_gql_queries"

const handler = async (req, res) => {
    try {
        const { data, loading } = await client.query({
            query: FETCH_ALL_PRODUCTS
        })
        
        return res.status(200).json({
            products: data.products.nodes,
            loading: loading

        })

    } catch (error) {
        return res.status(400).json({
            error: "An error has occured, please try again."
        })
    }
}

export default handler