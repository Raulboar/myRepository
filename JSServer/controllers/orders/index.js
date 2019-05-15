// Orders controller
const OrderModel = require('../../models/orders');
const db = require('../../database/db.js');
const joi = require('joi');
const _ = require('lodash');
const {
    orderSchema
} = require('../../schema/order');



const addOrder = (req, res) => {
    console.log('OrdersController.addOrder');
    const newOrder = new OrderModel(req.body);
    console.log('neworder = ' + JSON.stringify(newOrder));
    const validation = joi.validate(newOrder, orderSchema);
    console.log('validation =' + validation);
    if (!validation.error) {

        db.getItems({},
            function (err, result) {
                let ids = result.map(item => item.id);
                let reqItemlistIds = req.body.itemlist;
                let prices = result.map(item => item.price);
                console.log('IDS= ' + ids);
                console.log('reqItemlistIds = ' + reqItemlistIds);
                console.log('prices = ' + prices);


                let missingIds = _.difference(req.body.itemlist, ids);
                if (missingIds.length === 0) {
                    let total = 0;
                    reqItemlistIds.forEach(element => {
                        total = total + Number(prices[element - 1]);
                    });
                    newOrder.total = total;
                    console.log('Pozitiv');
                    db.addOrder(newOrder,
                        function (err, result) {
                            console.log('result = ' + JSON.stringify(result));
                            console.log('ItemIds =' + req.body.itemlist);
                            if (result.rows[0].id > 0) {
                                db.addOrderItems(result.rows[0].id, req.body.itemlist,
                                    function (err, result) {
                                        if (err) {
                                            console.log('An error has ocurred: ' + err);
                                        }
                                        console.log('orderItems = ' + result)
                                        res.send({
                                            "result": result
                                        });
                                    }
                                )
                            };
                            let textResponse;
                            if (err) {
                                textResponse = 'An error has ocurred when adding the order: ' + err;
                            } else {
                                textResponse = 'Order was added successfully';
                            }
                            console.log(textResponse)
                            res.send({
                                text: textResponse,
                                "success": !err,
                                "eroare": err

                            });
                        });
                } else {

                    res.send({
                        text: 'Some of the items do not exist'
                    });
                }
                let textResponse;
                if (err) {
                    textResponse = 'An error has ocurred when adding the order: ' + err;
                } else {
                    textResponse = 'Order was added successfully';
                }

                console.log(textResponse);
            });
    } else {
        res.send({
            text: validation.error.details[0].message
        });
    }

}



const getAllOrders = (req, res) => {
    console.log('OrdersController.getOrders');
    db.getAllOrders({}, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('orders = ' + result)
        res.send({


            "result": result
        });
    });
}


const getOrderById = (req, res) => {
    console.log('OrdersController.getOrderById');
    db.getOrderById({
        id: req.params.id
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('orders = ' + result)
        res.send({
            "orders": result
        });
    });

}

const getOrderDetailsById = (req, res) => {
    console.log('OrdersController.getOrderDetailsById');
    db.getOrderDetailsById({
        id: req.params.id
    }, function (err, result) {
        if (err) {

            console.log('An error has ocurred: ' + err);
        }

        if (result.length === 0) {
            res.send({
                text: 'Order does not exist'
            });
        }

        let qty = 1;
        let itemList = result.map(item => {
            let temp = {};
            temp.name = item.name;
            temp.price = item.price;
            temp.qty = qty;
            return temp;
        });


        console.log(result);
        console.log(itemList);
        let numeClient = result[0].clientname;
        let total = result[0].total;
        let itemNames = '';

        console.log("numeClient = " + numeClient);
        console.log("itemNames = " + itemNames);
        console.log("total = " + total);


        res.send({
            orderDetails: {
                clientName: numeClient,
                itemlist: itemList,
                total: total,

            }
        });
    });

}

const editOrderById = (req, res) => {
    console.log('OrderController.editOrderById');
    db.editOrderById({
        id: req.params.id,
        clientname: req.body.clientname,
        itemlist:req.body.itemlist
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('orders = ' + result)
        res.send({
            "orders": result
        });
    });
}

const deleteOrderById = (req, res) => {
    console.log('OrdersController.deleteOrderById');
    db.deleteOrderById({
        id: req.params.id
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('orders = ' + result)
        res.send({
            "orders": result
        });
    });
}
module.exports = {
    addOrder,
    getAllOrders,
    getOrderById,
    getOrderDetailsById,
    editOrderById,
    deleteOrderById
}