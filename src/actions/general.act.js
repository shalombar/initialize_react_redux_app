let products = [
    {
        ID: 1,
        Name: 'Coffie',
        Description: 'Tasty coffie',
        Price: 12,
    },
    {
        ID: 2,
        Name: 'Chocolate',
        Description: 'Tasty Chocolate',
        Price: 22,
    },
    {
        ID: 3,
        Name: 'Sugar',
        Description: 'Tasty Sugar',
        Price: 3,
    }
];


export const getProductsList = () => {
    return {
        type: 'GET_PRODUCTS_LIST',
        payload: products
    }
}

export const setProductSelected = (product) => {
    return {
        type: 'SET_PRODUCT_SELECTED',
        payload: product
    }
}


export const api = (type, payload) => {
    return {
        type: type,
        payload: payload
    }
}

export const update = (newDatas) => {
    return {
        type: 'API',
        payload: { type: 'UPDATE', newDatas, method: 'put' }
    }
}

export const deleteProduct = (newDatas) => {
    return {
        type: 'API',
        payload: { type: 'DELETE', newDatas, method: 'delete' }
    }
}

export const addProduct = (currentDb, newData, id) => {
    return {
        type: 'API',
        payload: { type: 'ADD', currentDb, newData, id, method: 'post' }
    }
}

export const isProductExist = (val) => {
    return {
        type: 'IS_PRODUCT_EXIST',
        payload: val
    }
}