import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link , Route, Switch } from "react-router-dom";
import './index.css';
import HomePage from './pages/home';
import OrderPage from './pages/orders';

// 2. ToolbarComponent
function ToolbarComponent() {
    return (
        <div className="toolbar">
            <h1>[Logo here]</h1>

            <Link to="/">Home</Link>

            <Link to="/orders">Orders</Link>
        </div>
    )
}

// 1. Main App Component
function MainApp() {
    return (
        <div>
            <ToolbarComponent />

            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/orders" component={OrderPage} />
                
                {/* when none of the above match, <NoMatch> will be rendered */}
                <Route component={() => <h1>No vl</h1>} />
            </Switch>
        </div>
    );
}

ReactDOM.render(
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>,
  document.getElementById('root')
);