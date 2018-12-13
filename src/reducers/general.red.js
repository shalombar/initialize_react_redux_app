export default (state = {}, action) => {
    state = {
        test: 'i am redux test',
        products: [],
        productSelected: null,
        isProductExist: false,
        ...state
    }
    switch (action.type) {
        case 'GET_PRODUCTS_LIST':
            let products = action.payload;

            return {
                ...state,
                products: products
            }
        case 'SET_PRODUCT_SELECTED':
            let productSelected = action.payload;

            return {
                ...state,
                productSelected: productSelected
            }
        case 'UPDATE':
            let newDatas = action.payload;

            return {
                ...state,
                products: newDatas
            }
        case 'ADD':
            let currnetProductsList = state.products;
            let addData = action.payload;

            currnetProductsList.push(addData);

            return {
                ...state,
                products: currnetProductsList
            }
        case 'IS_PRODUCT_EXIST':
            let isProductExist = action.payload;

            return {
                ...state,
                isProductExist: isProductExist
            }

        default:
            return state
    }
    return state;
}