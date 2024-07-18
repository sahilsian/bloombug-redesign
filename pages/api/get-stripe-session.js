const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log(session)

    res.status(200).json(session);
};