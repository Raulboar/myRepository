// Items controller
const { Item } = require('../../models/items');
const ItemModel = Item;
const db = require('../../database/db.js')
const joi = require('joi');
const {
    itemSchema
} = require('../../schema/item');
// const items = require('../../items.json');

const getItems = (req, res) => {
    console.log('ItemsController.getItems');
    db.getItems({}, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('items = ' + result)
        res.send({

            "NumberOfItemTypes": result.length,
            "items": result
        });
    });
}

const getItemById = (req, res) => {
    console.log('ItemsController.getItemById');
    db.getItemById({
        id: req.params.id
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('items = ' + result)
        res.send({
            "items": result
        });
    });

}

const editItemById = (req, res) => {
    console.log('ItemsController.editItemById');
    db.editItemById({
        id: req.params.id,
       name:req.body.name,
       description:req.body.description,
       price:req.body.price
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('items = ' + result)
        res.send({
            "items": result
        });
    });
}


const deleteItemById = (req, res) => {
    console.log('ItemsController.deleteItemById');
    
    db.deleteItemById({
        id: req.params.id
    }, function (err, result) {
        if (err) {
            console.log('The object is already in an order');
            res.send({
                "text": "The object is already in an order"
              })
        }
        console.log(result);  
        if (result==1){
           res.send({
             "text": "The item was deleted"
           })   
         }
       if (result == 0){
        res.send({ 
            "text":"This object does not exist" 
          })
        }
       
    });
}



const addItem = (req, res) => {
    console.log('ItemsController.addItem');
    const newItem =     new ItemModel(req.body);
    const validation = joi.validate(req.body, itemSchema);

    console.log(JSON.stringify(newItem, null, 2));

    if (!validation.error) {
        console.log('No validation errors');
        db.addItem(newItem,
            function (err, result) {
                let textResponse;
                if (err) {
                    textResponse = 'An error has ocurred when adding the item: ' + err;
                } else {
                    textResponse = 'item was added successfully';
                }
                console.log(textResponse)
                res.send({
                    text: textResponse,
                    "success": !err,
                    "eroare": err

                });
            });
    } else {
        console.log(validation.error);
        res.send({
            text: validation.error.details[0].message
        });
    }
}

const getItemByName = (req, res) => {
    console.log('ItemsController.getItemByName');
    db.getItemByName({
        name: req.params.name
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('items = ' + result)
        res.send({
            "items": result
        });
    });
}

const filterByPrice = (req, res) => {
    const price = req.params.price;

    db.getItemByPrice({
        price: req.params.price
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('items = ' + result)
        res.send({
            "items": result
        });
    });
}

const getNumberOfAppearencesInOrderItems = (req,res) => {
    console.log('ItemsController.getNumberOfAppearencerInOrderItems');
    db.getNumberOfAppearencesInOrderItems({
        id: req.params.id
    }, function (err, result) {
        if (err) {
            console.log('An error has ocurred: ' + err);
        }
        console.log('Number of apperence in item_orders = ' + result)
        res.send({
            "Number of apperence in item_orders": result
        });
    });
}


module.exports = {
    getItems,
    getItemById,
    addItem,
    deleteItemById,
    editItemById,
    getItemByName,
    filterByPrice,
    getNumberOfAppearencesInOrderItems
}