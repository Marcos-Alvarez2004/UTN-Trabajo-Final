import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductosItem from "../components/ProductosItem";

const Productos = () => {
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/productos");
      setProductos(res.data);
      setLoading(false);
    };

    fetchProductos();
  }, []);

  return (
    <section className="sec-productos">
      <h1 className="title-productos">Sus Productos</h1>
      <a className="link-backend" href="http://localhost:4000/admin/productos">
        Añadir productos
      </a>
      {loading ? (
        <p className="text-productos">Cargando...</p>
      ) : (
        productos.map((producto) => (
          <ProductosItem
            key={producto.id}
            title={producto.titulo}
            price={producto.precio}
            image={producto.imagen}
            body={producto.cuerpo}
          />
        ))
      )}
    </section>
  );
};

export default Productos;
