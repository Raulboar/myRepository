class Item {
    constructor({ id, name, description, price, images = [] }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
    }

    
    isValid() {
        console.log(this.name);
        console.log(this.description);
        console.log(this.price);
    
        return this.name && this.name.length > 3 && this.name.length <= 100 && this.description && this.description.length > 3 && this.price && typeof this.price == "number";  
    }
}

class editItem {
    constructor({ name, description, price, images = [] }) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.images = images;
    }

    
    isValid() {
        console.log(this.name);
        console.log(this.description);
        console.log(this.price);
    
        return this.name && this.name.length > 3 && this.name.length <= 100 && this.description && this.description.length > 3 && this.price && typeof this.price == "number";  
    }
}

module.exports ={
 Item,
 editItem
}