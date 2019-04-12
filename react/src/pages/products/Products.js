import React, {
    Component
} from 'react';
import Product from '../../components/product/Product';
import axios from 'axios';
import Breadcrumb from '../../layout/breadcrumb/Breadcrumb';
import Header from '../../layout/header/Header';
import queryString from 'query-string';

class ProductsPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            categories:[],
            query: ''
        };
    }
    handleClicked = () => {
        this.props.history.push('/items?search='+this.state.query);
        this.getValueSearch();
    }
    handleSetQuery = (query) => {
        this.setState({
            query: query
        });
    }
    getValueSearch = () => {
        if(this.state.query !== '') {
            this.searchItems(this.state.query);
        } else {
            this.setState({
                items: []
            });
        }
    }
    componentDidMount() {
        var queries = queryString.parse(this.props.location.search);
        this.setState({
            query: queries.search
        });
        this.searchItems(queries.search);
    }
    
    searchItems = (search) => {
        if(search) {
            axios.get('http://localhost:3001/api/items/?q='+search).then(res => {
                this.setState({
                    items: res.data.items?res.data.items:[],
                    categories: res.data.categories?res.data.categories:[]
                });
            }).catch(err => {
                console.log(err);
            });
        }
    };
    
    render() {
        const products = this.state.items;
        const categories = this.state.categories;
        
        return (
            
            <div className="homePage" >
                <Header clicked={this.handleClicked.bind(this)} setQuery={this.handleSetQuery.bind(this)} />
                <Breadcrumb data={categories} />
                <div className="container">
                    <div className="productList">
                        {
                            products.map((item) => {
                                return <Product data={item} key={item.id} />;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductsPage;
