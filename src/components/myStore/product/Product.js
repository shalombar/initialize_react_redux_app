import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    flag = false;

    componentWillMount() {
        this.props.getProductsList();
    }

    _onClick(product) {
        this.props.setProductSelected(product)
        this.props.setProductSelectedIndex(this.props.index)
    }

    _delete(e) {
        let { products } = this.props.general;
        let currentProductSelected = '';
        let currentProductSelectedIndex;
        let that = this;

        products.splice(this.props.index, 1)
        setCurrentProductSelectedAndIndex();
        this.props.setProductSelected(currentProductSelected);
        this.props.deleteProduct(products);


        function setCurrentProductSelectedAndIndex() {
            if (products.length == 0) {
                currentProductSelected = null;
                that.props.setProductSelectedIndex(null)
            }
            if (products.length == that.props.index) {
                currentProductSelected = products[that.props.index - 1];
                that.props.setProductSelectedIndex(that.props.index - 1)
            }
            else {
                currentProductSelected = products[that.props.index];
                that.props.setProductSelectedIndex(that.props.index)
            }
        }
    }

    _containerClassName() {
        if (this.props.productSelectedIndex == this.props.index) {
            return 'product selected';
        }
        return 'product';
    }

    render() {
        let { product } = this.props;

        return (
            <div className={this._containerClassName()} >
                <div className='productDetails' onClick={() => this._onClick(product)}>
                    <div className='productImg'></div>
                    <div className='productName'>{product.Name}</div>
                    <div className='productDescription'>{product.Description}</div>
                </div>

                <div className='deleteBtn' ><button onClick={() => this._delete()}>delete</button></div>
            </div>
        );
    }
}

export default (Product);

