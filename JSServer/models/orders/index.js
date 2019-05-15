class Order {
    constructor({ clientname , itemlist}) {
    
        this.clientname = clientname,
        //this.id = id,
        this.itemlist = itemlist
        
    }

    isValid() {
        return this.clientname &&  this.itemlist;
    }
}

module.exports = Order;