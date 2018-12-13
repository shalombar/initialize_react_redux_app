import React, { Component } from 'react';
import * as Functions from '../../../common/functions/functions';

class ProductDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            description: '',
            price: '',
            inputsValidation: { 'Name': true, 'Description': true, 'Price': true },
            isValid: true,
            isClicked: false
        }
    }

    componentWillMount() {
        this.props.getProductsList();
    }

    componentWillReceiveProps(nextProps) {
        console.log('sss', nextProps.general.productSelected)
        if (nextProps.general.productSelected && nextProps.general.productSelected.ID) {
            this.setState({
                id: nextProps.general.productSelected.ID,
                name: nextProps.general.productSelected.Name,
                description: nextProps.general.productSelected.Description,
                price: nextProps.general.productSelected.Price,
            })
        }
        else {
            if (!(this.state.id == '' && this.state.name == '' && this.state.description == '' && this.state.price == ''))
                this._clear();
        }
    }

    _clear() {
        this.setState({
            id: '',
            name: '',
            description: '',
            price: '',
        })
    }

    _onChange(inputType, e) {
        this.setState({ [inputType]: e.target.value })
    }

    _save() {
        let newData = {
            ID: this.state.id,
            Name: this.state.name,
            Description: this.state.description,
            Price: this.state.price,
        }
        let products = this.props.general.products;


        try {
            products[this.props.productSelectedIndex] = newData;
            if (this.state.isValid) {
                this.props.update(products);
            }
            else {
                this.setState({ isClicked: !this.state.isClicked })
            }
        }
        catch (err) { }
    }

    _validation(inputCheck) {
        let validationObj = {
            'Price': (val) => {
                if (val != '') {
                    return Functions.isNum(val);
                }
                return { status: 'ok' }
            },
            'Name': (val) => {
                if (val != '') {
                    return Functions.nameValidation(val);
                }
                return { status: 'ok' }
            },
            'Description': (val) => {
                return { status: 'ok' };
            }
        }

        let InputValidation = validationObj[inputCheck](this.refs[inputCheck].value);
        let { inputsValidation } = this.state;

        if (InputValidation.status == 'error') {
            this.refs[inputCheck].classList.add('invalid');
            inputsValidation[inputCheck] = false;
            this.setState({ isValid: false, inputsValidation });
        }
        else if (InputValidation.status == 'ok') {
            if (this.refs[inputCheck].className.includes('invalid')) {
                this.refs[inputCheck].classList.remove('invalid');
                inputsValidation[inputCheck] = true;
                this.setState({ isValid: true, inputsValidation })
            }
        }
    }

    render() {
        let { product } = this.props;

        return (
            <div className='productDetails'>
                <div><span>Product Details</span></div>
                <div className='productImg'></div>
                <div className='inputs'>
                    <label>
                        Name:<input type="text" ref='Name' value={this.state.name} onChange={(e) => { this._validation('Name'); this._onChange('name', e); }}></input>{!this.state.inputsValidation['Name'] && <span className="error-message">Oops! Input invalid!</span>}
                    </label>
                    <label>
                        Description:<textarea ref='description' value={this.state.description} onChange={(e) => this._onChange('description', e)}></textarea>
                    </label>
                    <label>
                        Price:<input ref='Price' type="text" value={this.state.price} onChange={(e) => { this._validation('Price'); this._onChange('price', e); }}></input>{!this.state.inputsValidation['Price'] && <span className="error-message">Oops! Input invalid!</span>}
                    </label>
                </div>
                <div className='saveeBtn'><button onClick={() => this._save()}>save</button></div>
                {!this.state.isValid && this.state.isClicked && <span className="error-message">Oops! inputs is not valid!</span>}
            </div>
        );
    }
}

export default (ProductDetails);

