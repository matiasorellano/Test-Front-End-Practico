import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/Home';
import ProductsPage from './pages/products/Products';
import ProductPage from './pages/product/Product';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import './styles/scss/styles.scss';


const routing = (
    <Router>
        <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/items" exact component={ProductsPage} />
            <Route path="/items/:id" component={ProductPage} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
