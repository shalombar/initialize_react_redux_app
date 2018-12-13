import React, { Component } from 'react';
import * as Functions from '../../common/functions/functions';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Description: '',
            Price: '',
            inputsValidation: { 'Name': true, 'Description': true, 'Price': true },
            isValid: true,
            isProductExist: false
        }
    }

    _add() {
        let addFormData = {
            Name: this.state.Name,
            Description: this.state.Description,
            Price: this.state.Price
        }

        let id = this._generateProductId();

        addFormData['ID']=id;

        this.props.isProductExist(false)

        this.props.addProduct(this.props.general.products, addFormData, id);

        this.setState({
            Name: '',
            Description: '',
            Price: '',
        })

    }

    _generateProductId() {
        let id = Math.floor((Math.random() * 1000) + 1);

        while (this._isIdExist(id)) {
            id = Math.floor((Math.random() * 1000) + 1);
        }

        return id;
    }

    _isIdExist(id) {
        let { products } = this.props.general;

        for (var i = 0; i < products.length; ++i) {
            let product = products[i];

            if (product.id == id) {
                return true;
            }
        }

        return false;
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

    _isProductExist(Name) {
        if (Functions.isProductExistByTitle(this.props.general.products, Name)) {
            this.setState({ isProductExist: true })
        }
        else {
            if (this.state.isProductExist) {
                this.setState({ isProductExist: false })
                this.props.isProductExist(false)
            }
        }
    }

    _renderButtons() {
        try {
            return (
                <div className="container">
                    {/* Button to Open the Modal  */}
                    <div className="btnContainer">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#add" ><span>Add New Product</span></button>
                    </div >

                    {/* The add Modal  */}
                    <div className="modal" id="add">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Add New Product </h4>
                                    <button type="button" className="close" data-dismiss="modal" onClick={() => this.props.isProductExist(false)}>&times;</button>
                                </div>

                                {/* Modal body  */}
                                <div className="modal-body">
                                    <div><span>{'Name: '} </span><input type="text" name="Name" value={this.state.Name} ref='Name' onChange={(e) => {this._validation('Name'); this.setState({ 'Name': this.refs.Name.value }); this._isProductExist(this.refs.Name.value) }}></input>{!this.state.inputsValidation['Name'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Description: '} </span><input type="text" name="Description" value={this.state.Description} ref='Description' onChange={(e) => { this._validation('Description'); this.setState({ 'Description': this.refs.Description.value }); }}></input>{!this.state.inputsValidation['Description'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                    <div><span>{'Price: '} </span><input type="text" name="Price" value={this.state.Price} ref='Price' onChange={(e) => { this._validation('Price'); this.setState({ 'Price': this.refs.Price.value }); }}></input>{!this.state.inputsValidation['Price'] && <span className="error-message">Oops! Input invalid!</span>}</div>
                                </div>

                                {/* Modal footer  */}
                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-danger" data-dismiss={()=>this.state.isValid && !this.props.general.isMovieExist && !Functions.isMovieExistByTitle(this.props.general.moviesList, this.state.title) ? "modal" : ''} onClick={() => { if (this.state.isValid) { this._add(this.props.index) } }}>Add</button> */}
                                    <button type="button" className="btn btn-danger" data-dismiss={this.state.isValid && !this.props.general.isProductExist && !this.state.isProductExist ? "modal" : ''} onClick={() => { if (this.state.isValid) { this._add(this.props.index) } }}>Add</button>
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.props.isProductExist(false)}>Close</button>
                                </div>
                                {this.props.general.isProductExist && <span className="error-message">Oops! This Product Is Exist!</span>}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        catch (err) { }
    }

    render() {
        return this._renderButtons()
    }
}

export default (AddProduct);

