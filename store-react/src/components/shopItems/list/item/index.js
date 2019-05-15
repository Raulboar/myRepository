import React from 'react';
import './styles.css';

// 4. ItemListItemComponent
function ItemListItemComponentDetail(props) {
    const item = props.item;
    const onItemEdit = props.onItemEdit;
    const onItemDelete = props.onItemDelete;

    // return (
    //     <pre>{JSON.stringify(student, null, 2)}</pre>
    // );

    return (
        <div className="item">
            <img src={item.image}/>
           <h1>{item.name}</h1>
           <h2>{item.description}</h2>

           <h3>{item.price} RON {true} {false}</h3>

           
           &nbsp;   
           <button onClick={() => { onItemEdit(item) }}>Edit</button>
            &nbsp; 
           <button onClick={() => { onItemDelete(item) }}>Delete</button>
        </div>
    )
}

export default ItemListItemComponentDetail;