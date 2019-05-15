const Pool = require('pg').Pool
const orderDetailsQuery = 'select o.clientname,o.total,i.name,i.price,oi.qty from orders o JOIN order_items oi ON o.id=oi.order_id JOIN items i ON i.id = oi.item_id where o.id = '

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'store',
  password: 'postgres',
  port: 5432,
})

const getItems = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query('SELECT * FROM items ORDER BY id ASC', (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}

const getItemById = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query('SELECT * FROM items where id =' + req.id, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}

const getItemByPrice = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query('SELECT * FROM items where price >' + req.price, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}

const getItemByName = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    console.log('HERE' + req.name)
    client.query('SELECT * FROM items where name =' + '\'' + req.name + '\'', (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}
      
const deleteItemById = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }

    client.query('DELETE FROM items where id = ' + req.id, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rowCount)
      return callback(null, result.rowCount);
    })

  })

}

const addItem = (item, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    console.log('HERE' + item.name)
    let queryString = 'INSERT into items (name,description,price) values ' + '(' + '\'' + item.name + '\',\'' + item.description + '\',' + item.price + ')';
    console.log(queryString);
    client.query(queryString, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result)
      return callback(null, result.rowCount);
    })
  })

}

const editItemById = (updateData, callback) => {
  var text = ' ';
  var ok = false;
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    let queryString = 'update items set ';
    if (updateData.name) {
      queryString += ' name =  ' + '\'' + updateData.name + '\'';
      text += '--Name modified--';
      ok = true;
    }
    if (updateData.description) {
      if (ok) {
        queryString += ',';
      }
      queryString += ' description =  ' + '\'' + updateData.description + '\'';
      text += '--Description modified--';
      ok = true;
    }
    if (updateData.price) {

      if (ok) {
        queryString += ',';
      }
      queryString += ' price =  ' + '\'' + updateData.price + '\'';
      text += '--Price modified--';
    }


    queryString += ' where id = ' + updateData.id;
    console.log(queryString);
    client.query(queryString, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }

    })
    if (text == ' ')
      text = '1';

    return callback(null, text);

  })
}


const getAllOrders = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query('select * from orders ', (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}

const getOrderById = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query('SELECT * FROM orders where id =' + req.id, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rows)
      return callback(null, result.rows);
    })
  })

}

const addOrder = (order, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    console.log('HERE' + order.clientname)
    let queryString = 'insert into orders (clientname,total) values ' +
      '(' +
      '\'' + order.clientname + '\'' + ',' +
      '\'' + order.total + '\'' +
      ') returning id';
    console.log(queryString);
    client.query(queryString, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rowCount)
      return callback(null, result);
    })
  })

}

const addOrderItems = (order_id, itemIds, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    let itemQuery = '';
    let queryString = 'insert into order_items (order_id,item_id,qty) values ';
    itemIds.forEach(element => {

      itemQuery += ' (' +
        order_id + ',' +
        element + ',' +
        '1' +
        ') ' + ',';
    });
    itemQuery = itemQuery.slice(0, -1);
    queryString = queryString + itemQuery;
    console.log(queryString);
    client.query(queryString, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }
      console.log(result.rowCount)
      return callback(null, result);
    })
  })

}

const getOrderDetailsById = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    client.query(orderDetailsQuery + req.id, (err, result) => {
      release()

      if (err) {
        console.log(err);
        return callback('Error executing query : ' + err)
      }

      return callback(null, result.rows);
    })
  })

}

const editOrderById = (updateData, callback) => {
  var text = ' ';
  var ok = false;
  pool.connect((err, client, release) => {
    if (err) {
      return callback('Error acquiring client because of ' + err)
    }
    let queryString = 'update orders set ';
    if (updateData.clientname) {
      queryString += ' clientname =  ' + '\'' + updateData.clientname + '\'';
      text += '--Name modified--';
      ok = true;
    }
    // if (updateData.itemlist) {
    //   queryString += ' itemlist =  ' + '\'' +  updateData.itemlist + '\'';
    //   text += '--Itemlist modified--';
    //   ok = true;
    // }  
    queryString += ' where id = ' + updateData.id;
    console.log(queryString);
    client.query(queryString, (err, result) => {
      release()
      if (err) {
        return callback('Error executing query : ' + err)
      }

    })
    if (text == ' ')
      text = '1';

    return callback(null, text);

  })
}

const deleteOrderById = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
     return callback('Error acquiring client because of ' + err)
      }
      if (getNumberOfAppearencesInOrderItems(req.id) == 0) {
      client.query('DELETE FROM orders where id = ' + req.id, (err, result) => {
      release()
      if (err) {
      return callback('Error executing query : ' + err)
      }
      console.log(result.rowCount)
      return callback(null, result.rowCount);
      });
    }
  });
}

const getNumberOfAppearencesInOrderItems = (req, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
     return callback('Error acquiring client because of ' + err)
      }
      client.query('SELECT FROM order_items where item_id = ' + req.id, (err, result) => {
        release()
        if (err) {
         return ('Error executing query : ' + err)
        }
        console.log(result.rowCount)
        return callback(null, result.rowCount);
        })
      })
    }

    module.exports = {
      getItems,
      getItemById,
      getItemByPrice,
      getItemByName,
      deleteItemById,
      addItem,
      editItemById,
      getAllOrders,
      getOrderById,
      addOrder,
      addOrderItems,
      getOrderDetailsById,
      editOrderById,
      deleteOrderById,
      getNumberOfAppearencesInOrderItems
    }