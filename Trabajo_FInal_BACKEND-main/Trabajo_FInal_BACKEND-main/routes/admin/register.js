var express = require("express");
var router = express.Router();
var usuariosModel = require("../../models/usuariosModel");

/* GET register page. */
router.get("/", (req, res, next) => {
  res.render("admin/register", {
    layout: "layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    if (req.body.nombre != "" && req.body.password != "") {
      await usuariosModel.registerUser(req.body);
      res.redirect("/admin/login");
    } else {
      res.render("admin/register", {
        layout: "layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/register", {
      layout: "layout",
      error: true,
      message: "No se pudo registrar el usuario",
    });
  }
});

module.exports = router;
