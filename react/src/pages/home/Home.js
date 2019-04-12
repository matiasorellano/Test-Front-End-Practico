import React, {
    Component
} from 'react';
import Header from '../../layout/header/Header';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:''
        };
    }
    handleClicked = () => {
        this.props.history.push('/items?search='+this.state.query);
    }
    handleSetQuery = (query) => {
        this.setState({
            query: query
        });
    }
    render() {
        return (
            
            <div className="homePage" >
                <Header clicked={this.handleClicked.bind(this)} setQuery={this.handleSetQuery.bind(this)} />
                <div className="container">

                </div>
            </div>
        );
    }
}

export default HomePage;
