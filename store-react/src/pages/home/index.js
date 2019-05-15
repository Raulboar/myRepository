import React, { Component } from 'react';
import ShopItemsList from '../../components/shopItems/list';
import ShopItemCreateForm from '../../components/shopItems/createForm';
import axios from 'axios';

/**
 * Homepage component
 * 
 * Should render all the shop items
 * Should allow creation of shop items
 * Once a new show item is created, reload all the shop items
 */
class HomePage extends Component {
    state = { 
        showCreate: false,
        showDelete: false,
        selectedItemForEdit: false,
        items: [], // keep shop items on component's state
    }

    constructor(props) {
        super(props);

        this.getShopItems = this.getShopItems.bind(this);
        this.addShopItem = this.addShopItem.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.openDelete = this.openDelete.bind(this);
        this.editShopItem = this.editShopItem.bind(this);
        this.deleteShopItem = this.deleteShopItem.bind(this);
    }

    // Method that fetches all the shop items
    async getShopItems() {
        console.log('Getting all items from back end server');
        try {
            const result = await axios.get('http://localhost:4000/items');

            const items = result.data.items;
            
            this.setState({ items: items });
        }
        catch(error) {
            console.log('error');
            console.log(error);
        }
    }


    // Method that creates a new shop item
    async addShopItem(data) {
        console.log('Inside homepage addShopItem method');
        console.log(data);

        try {
            const result = await axios.post('http://localhost:4000/items', data);

            this.setState({ showCreate: false });
            this.getShopItems();
        }
        catch(error) {
            console.log('Errorrrrr');
            console.log(error);
        }
    }


    // Method that edits a specific shop item
    async editShopItem(data) {
        console.log('will edit: ');
        console.log(data);
        const selectedItemForEdit = this.state.selectedItemForEdit;
        const id = selectedItemForEdit.id;
        this.setState({ showDelete: false });
        this.getShopItems();
        
        try {
            const result = await axios.put('http://localhost:4000/items/' + id, data);

          
        }
        catch(error) {
             console.log('Errorrrrr');
            console.log(error);
        }
       
        
    }
   
    async deleteShopItem(data) {
        console.log('will delete: ');
        console.log(data);
        this.setState({ showDelete: false });
        this.getShopItems();
        console.log("STERGEEEEE "+ data.id)
       try {
            const result = await axios.delete('http://localhost:4000/items/' + data.id, data);
       }
        catch(error) {
             console.log('Errorrrrr');
            console.log(error);
        }
  }
   
    
    async componentDidMount() {
        await this.getShopItems();
    }
    
    openEdit(item) {
        console.log('Will open the edit form');
        
        this.setState({ selectedItemForEdit: item });
    }

    openDelete(item) {
        this.deleteShopItem(item);
        // const selectedItemForEdit = this.state.selectedItemForEdit;
        // const id = selectedItemForEdit.id;
        // axios.delete('http://localhost:4000/items/' + id);
        //console.log(''  + id);
    }

    render() {
        const items = this.state.items;
        const showCreate = this.state.showCreate;
        const showDelete = this.state.showDelete;
        const selectedItemForEdit = this.state.selectedItemForEdit;

        return (
            <div>
                <div className="flex space-between">
                    <h1>Shop items</h1>
                
                    <button onClick={() => this.setState({showCreate: true})}>Create</button>
                </div>

                {
                    showCreate
                        ? <ShopItemCreateForm onSubmitClick={this.addShopItem}/>
                        : null
                }
                {
                    selectedItemForEdit
                        ? (
                            <ShopItemCreateForm
                             initialValue={selectedItemForEdit}
                             onSubmitClick={this.editShopItem} 
                            />
                        )
                        : null
                }
                 {
                    showCreate
                        ? <ShopItemCreateForm onSubmitClick={this.editShopItem}/>
                        : null
                }
                 {
                    showDelete
                        ?  <ShopItemCreateForm onSubmitClick={this.deleteShopItem}/>
                        : null
                }
                <ShopItemsList 
                    onItemEdit={this.openEdit}
                    onItemDelete={this.openDelete}
                    items={items}
                />
            </div>
        );
    }
}

export default HomePage;