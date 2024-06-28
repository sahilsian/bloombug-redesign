import client from "../../lib/client"
import { GET_CART } from "../../lib/gql/woo_gql_queries";


const handler = async (req, res) => {
    try {
    const { data } = await client.query({
        query: GET_CART,
    })

    return res.status(200).json(data);

    } catch (error) {
        return res.status(400).json({
            error: "An error has occured, please try again."
        })
    }
}

export default handler