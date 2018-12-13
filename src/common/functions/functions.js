export const isNum = (val) => {
    if (isNaN(val) || val < 0) {
        return {
            status: 'error',
            msg: 'price is not valid'
        }
    }
    return { status: 'ok' }
}

export const nameValidation = (val) => {
    let letters = /^[a-zA-Z\s]*$/;

    if (!letters.test(val)) {
        return {
            status: 'error',
            msg: 'name is not valid'
        }
    }
    return { status: 'ok' }
}

export const arrayToString = (stringArray) => {
    let output = stringArray.toString();

    output = output.replace(/,/g, '');

    return output;
}

export const setUpperlowerCase = (stringArray) => {
    stringArray[0] = stringArray[0].toUpperCase();
    for (var i = 1; i < stringArray.length; ++i) {
        if (!isNaN(stringArray[i])) {
            stringArray[i] = stringArray[i].toLowerCase();
        }
        if (stringArray[i] == ' ') {
            stringArray[++i] = stringArray[i].toUpperCase();
        }
    }

    return stringArray;
}

export const isProductExist = (products, id) => {
    for (var item in products) {
        if (products[item].ID == id)
            return true;
    }

    return false;
}

export const isProductExistByTitle = (products, name) => {
    for (var item in products) {
        if (products[item].Name.toUpperCase() == name.toUpperCase())
            return true;
    }

    return false;
}