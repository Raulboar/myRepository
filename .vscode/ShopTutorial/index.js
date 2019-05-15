// const item = require('./items.json');
// const fs = require('fs');

const minNumberOfCharacters = 3;
const maxNumberOfCharactersforName = 30;
const maxNumberOfCharactersforDescription = 100;

const addItem = (item) => {
    const id = items.length + 1;

    if (!item.name) {
        throw new Error('Name is required for item ' + id);
    }
    if (item.name.length < minNumberOfCharacters) {
        throw new Error('Name is too short for item ' + id);
    }
    if (item.name.length > maxNumberOfCharactersforName) {
        throw new Error('Name is too long for item ' + id);
    }
    if (!item.description) {
        throw new Error('Descrition is required for item ' + id);
    }
    if (item.description.length < minNumberOfCharacters) {
        throw new Error('Description is too short for item ' + id);
    }
    if (item.description.length > maxNumberOfCharactersforDescription) {
        throw new Error('Description too long for item ' + id);
    }
    if (item.price <= 0) {
        throw new Error('Price is not available for item' + id);
    }

    item.id = items.length + 1;
    items.push(item);

    return item;
}

const editByID = (id, name, description, price, images) => {
    const itemIndex = items.findIndex(items => items.id === id); // findIndex result: 0-n daca elementul exista sau -1 daca nu exista
    items[itemIndex].name = name;
    items[itemIndex].description = description;
    items[itemIndex].price = price;
    items[itemIndex].images = images;

    return items[itemIndex];
}

const getItemByID = (id) => {
    return items.find(items => items.id === id);
}

const getAllItems = () => {
    return items;
}

const getItemsWherePriceIsOver = (price) => {
    return items.find(items => items.price > price);
}

const deleteItemByID = (id) => {
    const index = items.findIndex(items => items.id === id);
    items.splice(index, 1);

}

const items = [];
const milk = {
    name: 'milk',
    id: 1,
    description: 'Milk is a nutrient-rich, white liquid food produced by the mammary glands of mammals.',
    price: 4.93,
    images: ['image1', 'image2', 'image3']
};

const yogurt = {
    name: 'yogurt',
    id: 2,
    description: 'ogurt, yoghurt or yoghourt is a food produced by bacterial fermentation of milk.',
    price: 2.60,
    images: ['image1', 'image2']
};

const bread = {
    name: 'bread',
    id: 3,
    description: 'Bread is a staple food prepared from a dough of flour and water, usually by baking.',
    price: 5.00,
    images: ['image1']
};

const flour = {
    name: 'flour',
    id: 4,
    description: 'Flour is a powder made by grinding raw grains or roots and used to make many different foods.',
    price: 3.90,
    images: ['image1', 'image2']
};

const meat = {
    name: 'water',
    id: 5,
    description: 'Meat is animal flesh that is eaten as food.',
    price: 15,
    images: ['image1', 'image2']
};

const chocolate = {
    name: 'chocolate',
    id: 6,
    description: 'Chocolate is a usually sweet, brown food preparation of roasted and ground cacao seeds.',
    price: 4.00,
    images: ['image1', 'image2', 'image3', 'image4']
};

const water = {

    name: 'water',
    id: 7,
    description: 'fa',
    price: 2.50,
    images: ['image1']
};
// fs.writeFile(
//     'items.json',
//     JSON.stringify({}, null, 4),
//     (err) => {
//         if (err) console.log(err);

//         console.log('The file has been saved!');
//     }
// );

try {
    const milkToBeAdded = addItem(milk);
    console.log(milkToBeAdded);
    console.log(addItem(yogurt));
    console.log(addItem(bread));
    console.log(addItem(flour));
    console.log(addItem(meat));
    console.log(addItem(chocolate));
    console.log(addItem(water));
}
catch (error) {
    console.log('An error occured');
}

// console.log(items);

/** 
 * 1. Create a function that validates an item. Call it when creating/editing an item
 * 2. On the edit item, add another 'validation' (if statement) that verifies
 *    1. That we send an id
 *    2. That our items array contains an element with the specified id
 * 3. Create a function that return all items ordered by price ascending or descending, depending on a parameter named sortType: boolean: true - ascending, false- descending
*/