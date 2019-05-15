import React from 'react';
import './styles.css';


function OrderListOrderComponentDetail(props) {
    const order = props.order;


    return (
        <div className="order">
           
           <h1>{order.clientname}</h1>
           <h2>{order.itemlist}</h2>

           
           <button onClick={() => {
               alert(JSON.stringify(order, null, 2));
           }}>
               Some action
            </button>
        </div>
    )
}

export default OrderListOrderComponentDetail;