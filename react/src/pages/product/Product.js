import React, {
    Component
} from 'react';
import axios from 'axios';
import Breadcrumb from '../../layout/breadcrumb/Breadcrumb';
import Header from '../../layout/header/Header';

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
            loaded: false
        };
    }
    componentDidMount() {
        this.getProduct(this.props.match.params.id);
    }
    getProduct = (id) => {
        axios.get('http://localhost:3001/api/items/'+id).then(res => {
            this.setState({
                loaded:true,
                item: res.data.item
            });
        }).catch(err => {
            console.log(err);
        });
    };

    handleClicked = () => {
        this.props.history.push('/items?search='+this.state.query);
    }
    handleSetQuery = (query) => {
        this.setState({
            query: query
        });
    }
    breakLine = (text) => {
        var br = React.createElement('br');
        var regex = /(<br \/>)/g;
        return text.split(regex).map(function(line, index) {
            return line.match(regex) ? <br key={"key_" + index} /> : line;
        });
    }
    render() {
        
        if (this.state.loaded === false) {
            return null;
        }
        const item = this.state.item;
        return (
            <div>
                <Header clicked={this.handleClicked.bind(this)} setQuery={this.handleSetQuery.bind(this)} />
                <div className="productPage" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 imgBlock">
                                <img src={item.picture} alt="img product"/>
                            </div>
                            <div className="col-md-4 infoRight mb20">
                                <div className="conditions">{item.condition} - {item.sold_quantity} vendidos</div>
                                <h1></h1>
                                <p className="price">{(item.price.currency=="ARS"?"$":"U$")}{item.price.amount}</p>
                                <div className="addToCart">
                                    <a href="#" className="btn btn-primary">Comprar</a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="descriptionBlock">
                                    <h3>Descripción del producto</h3>
                                    <div className="text" >
                                        <p>{ this.breakLine(item.description) }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default ProductPage;
