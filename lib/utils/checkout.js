
export const getStripeLineItems = (products) => {
    if (products.length == 0) {
        return [];
    }

    return products.map(product => {
        return {
            quantity: product?.qty ?? 0,
            name: product?.name ?? '',
            images: [product?.image?.sourceUrl ?? ''],
            amount: Math.round(product?.price * 100),
            currency: 'usd',
        }
    })
}

export const getMetaData = ( input, orderId ) => {

    return {
        billing: JSON.stringify(input?.billing),
        shipping: JSON.stringify(input?.billing?.email),
        orderId,
    };

    // @TODO
    // if ( customerId ) {
    //     metadata.customerId = customerId;
    // }

}