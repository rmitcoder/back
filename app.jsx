import React from 'react';
import ReactDOM from 'react-dom';
import { Router,Route,IndexRoute,hashHistory } from 'react-router';
import Layout from './components/common.comp';
import HomeComponent from './components/home.comp';
import ClientComponent from './components/client.comp.jsx';
import ContactComponent from './components/contact.comp.jsx';
import ServiceComponent from './components/service.comp.jsx';
import GetPrice from './components/product.comp';
import DLComponent from './components/driveLicence.comp';
import DocUpload from './components/upload.comp';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout} >
            <IndexRoute component={HomeComponent}/>
            <Route path="/services" components={ServiceComponent}>
                <Route path="/services/Driver's Licence Check" component={DLComponent}/>
            </Route>
            <Route path="/services/:doc" component={GetPrice} />
            <Route path="/client" component={ClientComponent}/>
            <Route path="/contact" component={ContactComponent}/>
            <Route path="/upload" component={DocUpload}/>
        </Route>
    </Router>,
    document.getElementById('app')
);