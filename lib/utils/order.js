export const getCreateOrderLineItems = (products) => {

    // if (isEmpty(products) || !isArray( products )) {
    //     return []
    // }

    console.log( 'products', products );

    return products?.map(
        ({productId, qty: quantity}) => {
            return {
                quantity,
                product_id: productId,
                // variation_id: '', // @TODO to be added.
            };
        },
    );
}

export const createTheOrder = async ( orderData, setOrderFailedError, previousRequestError ) => {
    let response = {
        orderId: null,
        total: '',
        currency: '',
        error: ''
    };

    // Don't proceed if previous request has error.
    if ( previousRequestError ) {
        response.error = previousRequestError;
        return response;
    }

    setOrderFailedError( '' );

    console.log("OD:", orderData)

    try {
        const request = await fetch( '/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( orderData ),
        } );

        const result = await request.json();
        if ( result.error ) {
            response.error = result.error
            setOrderFailedError( 'Something went wrong. Order creation failed. Please try again' );
        }
        response.orderId = result?.orderId ?? '';
        response.total = result.total ?? '';
        response.currency = result.currency ?? '';

    } catch ( error ) {
        // @TODO to be handled later.
        console.warn( 'Handle create order error', error?.message );
    }

    return response;
}