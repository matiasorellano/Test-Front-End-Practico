import React, {
    Component
} from 'react';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="breadcrumbBlock">
                <div className="container">
                    <ol className="breadcrumb">
                        {
                            this.props.data.map((item,index) => {
                                return <li key={index} className="breadcrumb-item">
                                        {item}
                                    </li>;
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Breadcrumb;
