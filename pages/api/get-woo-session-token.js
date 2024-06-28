import { gql } from "@apollo/client";
import client from "../../lib/client";

const GET_SESSION = gql`
  query {
    viewer {
      wooSessionToken
    }
  }
`;

export default async function handler(req, res) {
    try {
        // Query 'wooSessionToken' using Apollo Client
        const { data } = await client.query({
            query: GET_SESSION,
        });

        const { wooSessionToken } = data.viewer;

        if (!wooSessionToken) {
            return res.status(404).json({ error: 'WooCommerce session token not found' });
        }

        res.status(200).json({ wooSessionToken });
    } catch (error) {
        console.error('Error fetching WooCommerce session token:', error);
        res.status(500).json({ error: 'Failed to fetch WooCommerce session token' });
    }
}