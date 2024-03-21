var pool = require("./bd");

// GET todos los productos
async function getProductos() {
  var query = "select * from productos_v2";
  var rows = await pool.query(query);
  return rows;
}

// INSERT producto
async function insertProducto(obj) {
  try {
    var query = "insert into productos_v2 set ?";
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// GET producto por id
async function getProductosById(id) {
  var query = "select * from productos_v2 where id = ?";
  var rows = await pool.query(query, [id]);
  return rows[0];
}

// UPDATE producto por id
async function modificarProductosById(obj, id) {
  try {
    var query = "update productos_v2 set ? where id = ?";
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// DELETE producto por id
async function deleteProductoById(id) {
  var query = "delete from productos_v2 where id = ?";
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getProductos,
  insertProducto,
  getProductosById,
  modificarProductosById,
  deleteProductoById,
};
