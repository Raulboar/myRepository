const router = require('express-promise-router')();
const itemsController = require('../../controllers/items');

const PATH = 'items';

// /items
router.route('/')
    .get(itemsController.getItems)
    .post(itemsController.addItem);

// /items/23
router.route('/:id')
    // get all items
    .get(itemsController.getItemById)
    .delete(itemsController.deleteItemById)
    .put(itemsController.editItemById)
    .put((req, res) => {
        res.send({
            text: 'Will need to edit a specific item'   
        });
    });


// /items/name/milk
router.route('/name/:name')
    .get(itemsController.getItemByName)
    .get((req, res) => {
        res.send({
            text: 'Will need to get an item based on name'
        });
    });

// /items/byprice/23
router.route('/byprice/:price')
    .get(itemsController.filterByPrice)
    .get((req, res) => {
        res.send('Will need to get an item based on name');
    });

router.route('/isvalid/:id')  
   .get(itemsController.getNumberOfAppearencesInOrderItems)  

module.exports = {
    router,
    PATH,
}