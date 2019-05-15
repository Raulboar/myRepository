import React from 'react';
import OrderListOrderComponentDetail from './order';
import './styles.css';

// 3. ItemListComponent
function OrderListComponent(props) {
    const orders = props.orders;

    return (
        <div className="order-list">
            Avem {orders.length} comenzi

            <br />
            <br />
            <br />

            <div className="flex">
                {
                    orders.map((order, index) => {
                        order.image = 'https://pbs.twimg.com/profile_images/507251035929190400/BDUL3Uzt_400x400.png';
                        return (
                            <OrderListOrderComponentDetail key={index} order={order}/>
                        );
                    })
                }
            </div>

        </div>
    );
}


export default OrderListComponent;
