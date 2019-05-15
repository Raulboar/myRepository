import React from 'react';
import ItemListItemComponentDetail from './item';
import './styles.css';

// 3. ItemListComponent
function ItemListComponent(props) {
    const items = props.items;
    const onItemEdit = props.onItemEdit;
    const onItemDelete = props.onItemDelete;

    return (
        <div className="item-list">
            Avem {items.length} produse

            <div className="flex">
                {
                    items.map((item, index) => {
                        item.image = 'https://pbs.twimg.com/profile_images/507251035929190400/BDUL3Uzt_400x400.png';
                        return (
                            <ItemListItemComponentDetail 
                                key={index}
                                item={item}
                                onItemEdit={onItemEdit}
                                onItemDelete={onItemDelete}
                             />
                        );
                    })
                }
            </div>

        </div>
    );
}


export default ItemListComponent;
