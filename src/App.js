//language=js
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './Layout';
import Home from './Home';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

//const NotFound = () => {
  //<h2>404 Not Found</h2>;
//}

const App = () => {
  return ( 
    <Router basename="/Exchange-rate-site">
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/currencyconverter" component={CurrencyConverter} />
        <Route render={() => <h1>404 Not found</h1>} />
      </Switch>
    </Layout>
  </Router>
  );
}

export default App;