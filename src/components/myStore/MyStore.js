import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/general.act';
import Product from './product/Product';
import ProductDetails from './product/ProductDetails';
import AddProduct from '../addProduct/AddProduct';

class MyStore extends Component {
    constructor(props) {
        super(props)
        this.state = { productSelectedIndex: null }
    }

    componentWillMount() {
        this.props.getProductsList();
    }

    setProductSelectedIndex(index) {
        this.setState({ productSelectedIndex: index })
    }

    render() {
        let { products } = this.props.general;

        return (
            <div className="myStore">
                <AddProduct {...this.props} />
                <div className="products">
                    {products.map((item, key) => <Product {...this.props} key={key} product={item} index={key} setProductSelectedIndex={this.setProductSelectedIndex.bind(this)} productSelectedIndex={this.state.productSelectedIndex} />)}
                </div>
                {products.length > 0 && <ProductDetails {...this.props} productSelectedIndex={this.state.productSelectedIndex} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
})

export default connect(mapStateToProps, actions)(MyStore);

