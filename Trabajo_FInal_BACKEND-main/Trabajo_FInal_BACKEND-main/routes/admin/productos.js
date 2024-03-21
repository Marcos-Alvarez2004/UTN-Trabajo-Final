var express = require("express");
var router = express.Router();
var productosModel = require("../../models/productosModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);

/* GET productos page. */
router.get("/", async (req, res, next) => {
  var productos = await productosModel.getProductos();

  productos = productos.map((producto) => {
    if (producto.img_id) {
      const imagen = cloudinary.image(producto.img_id, {
        width: 550,
        height: 550,
      });
      return {
        ...producto,
        imagen,
      };
    } else {
      return {
        ...producto,
        imagen: "Sin imagen",
      };
    }
  });

  res.render("admin/productos", {
    layout: "layout",
    usuario: req.session.nombre,
    productos,
  });
});

// GET agregar producto page
router.get("/agregar", async (req, res, next) => {
  res.render("admin/agregar", {
    layout: "layout",
  });
});

// POST agregar producto page
router.post("/agregar", async (req, res, next) => {
  try {
    var img_id = "";
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }
    if (
      req.body.titulo != "" &&
      req.body.precio != "" &&
      req.body.cuerpo != ""
    ) {
      await productosModel.insertProducto({ ...req.body, img_id });
      res.redirect("/admin/productos");
    } else {
      res.render("admin/agregar", {
        layout: "layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/agregar", {
      layout: "layout",
      error: true,
      message: "No se pudo agregar el producto",
    });
  }
});

// GET modificar productos page
router.get("/modificar/:id", async (req, res, next) => {
  var id = req.params.id;
  var producto = await productosModel.getProductosById(id);
  res.render("admin/modificar", {
    layout: "layout",
    producto,
  });
});

// POST modificar productos page
router.post("/modificar", async (req, res, next) => {
  try {
    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }

    if (borrar_img_vieja && req.body.img_original) {
      await destroy(req.body.img_original);
    }

    let obj = {
      titulo: req.body.titulo,
      precio: req.body.precio,
      cuerpo: req.body.cuerpo,
      img_id,
    };

    await productosModel.modificarProductosById(obj, req.body.id);
    res.redirect("/admin/productos");
  } catch (error) {
    console.log(error);
    res.render("admin/productos", {
      layout: "layout",
      error: true,
      message: "No se pudo modificar el producto",
    });
  }
});

// DELETE producto by id
router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;

  let producto = await productosModel.getProductosById(id);
  if (producto.img_id) {
    await destroy(producto.img_id);
  }

  await productosModel.deleteProductoById(id);
  res.redirect("/admin/productos");
});

// REGISTER USER PAGE

module.exports = router;
