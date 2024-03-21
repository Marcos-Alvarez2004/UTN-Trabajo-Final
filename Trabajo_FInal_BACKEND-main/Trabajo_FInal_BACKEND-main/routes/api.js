var express = require("express");
var router = express.Router();
var productosModel = require("../models/productosModel");
var clodinary = require("cloudinary").v2;
var nodemailer = require("nodemailer");

router.get("/productos", async (req, res, next) => {
  let productos = await productosModel.getProductos();

  productos = productos.map((productos) => {
    if (productos.img_id) {
      const imagen = clodinary.url(productos.img_id, {
        width: 300,
        height: 300,
      });
      return {
        ...productos,
        imagen,
      };
    } else {
      return {
        ...productos,
        imagen: "",
      };
    }
  });

  res.json(productos);
});

// POST Email
router.post("/contacto", async (req, res, next) => {
  const mail = {
    to: "flavia.ursino@gmail.com",
    subject: "Contacto desde la web",
    html: `"${req.body.nombre}" dejo el siguiente mensaje: "${req.body.mensaje}" - Email: "${req.body.email}" <br> Teléfono: "${req.body.telefono}"`,
  };

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transport.sendMail(mail);

  res.status(201).json({
    error: false,
    message: "Mensaje enviado con éxito!",
  });
});

module.exports = router;
