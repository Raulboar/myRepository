import React, { Component } from 'react';
import axios from 'axios';
import ShopOrdersList from '../../components/shopOrders/list';
import ShopOrderCreateForm from '../../components/shopOrders/createForm';
class Orders extends Component {
    state = {
         orders: []
    }


componentWillMount() {
    console.log('Component will mount');
}

async componentDidMount() {
    try {
        const result = await axios.get('http://localhost:4000/orders');

        console.log(result);
        const orders = result.data.result;
        
        this.setState({ orders: orders });
    }
    catch(error) {
        console.log('error');
        console.log(error);
    }
 }

 componentWillUpdate() {
    console.log('Component will update');
 }

 componentDidUpdate() {
    console.log('Component did update');
 }

 render() {
       const orders = this.state.orders;
      
    console.log('Render');

    return (
        <div>
          <ShopOrderCreateForm />
          <ShopOrdersList orders = {orders} />
         
        </div>
    );
 }
}


export default Orders;