import * as actions from '../actions/general.act';
import * as Functions from '../common/functions/functions';

// const axios = require('axios');

export default store => next => action => {
    if (action.type == 'API') {


        let { type, method, index, newData, newDatas, id, currentDb } = action.payload;

        let api = {
            'get': (data) => {
                store.dispatch(actions.api(type, data))
            },
            'post': (newMovie) => {
                store.dispatch(actions.api(type, newMovie))
            },
            'put': () => {
                store.dispatch(actions.api(type, newDatas))
            },
            'delete': () => {
                store.dispatch(actions.api(type, newDatas))
            }
        }

        if (type == 'ADD') {
            let newProduct = newData

            if (!Functions.isProductExistByTitle(currentDb, newProduct.Name)) {
                api[method](newProduct);
                store.dispatch(actions.isProductExist(false))
            }
            else {
                store.dispatch(actions.isProductExist(true))
            }
        }
        else {
            api[method]();
        }
    }
    return next(action)
}