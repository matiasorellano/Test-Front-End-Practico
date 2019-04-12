import React, {
    Component
} from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        const {id, picture, title, price, free_shipping} = this.props.data;
        return (
            <div className="productBlock">
                <div className="imgBlock">
                    <img src={picture} alt="img_product" />
                </div>
                <div className="infoBlock">
                    <div className="price">
                        <Link to={"/items/"+id}>
                            {(price.currency=="ARS"?"$":"U$")}{price.amount} <span className={"iconShipping "+ (free_shipping ? 'show' : 'hidden')}></span>
                        </Link>
                    </div>
                    <div className="name">
                        <Link to={"/items/"+id}>
                            { title }
                        </Link>
                    </div>
                </div>
                <div className="cityBlock">
                    Capital Federal
                </div>
            </div>
        );
    }
}

export default Product;
