import React, {
    Component
} from 'react';
import logo from './Logo_ML.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:''
        };
    }
    queryChange = (evt) => {
        this.setQueryValue(evt);
    }
    handleSubmit= (event) => {
        this.props.clicked(this.state.query);
        event.preventDefault();
    }
    setQueryValue(evt) {
        this.setState({
            query: evt.target.value
        });
        this.props.setQuery(evt.target.value);
    }
    render() {

        return (
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-1">
                            <div className="imgBlock">
                                <img src={logo} alt="logo" />
                            </div>
                        </div>
                        <div className="col-sm-11">
                            <form onSubmit={this.handleSubmit}>
                                <div className="inputBlock">
                                    <input type="text" name="search" placeholder="Nunca dejes de buscar" value={this.state.query} onChange={this.queryChange}/>
                                    <span className="iconSearch" onClick={this.props.clicked}></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
