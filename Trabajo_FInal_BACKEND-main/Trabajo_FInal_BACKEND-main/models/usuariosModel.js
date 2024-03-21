var pool = require("./bd");
var md5 = require("md5");

// LOGIN usuario registrado
async function getUsernameAndPassword(user, password) {
  try {
    var query =
      "select * from usuarios where nombre = ? and password = ? limit 1";
    var rows = await pool.query(query, [user, md5(password)]);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

// REGISTER usuario nuevo

async function registerUser(obj) {
  try {
    // incriptar la contraseña
    var pw = obj.password;
    obj.password = md5(pw);

    var query = "insert into usuarios set ?";
    var rows = await pool.query(query, [obj, obj.password]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { getUsernameAndPassword, registerUser };
