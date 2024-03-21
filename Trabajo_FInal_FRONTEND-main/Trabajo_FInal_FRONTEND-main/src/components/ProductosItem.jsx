import React from "react";

const ProductosItem = (props) => {
  const { title, price, image, body } = props;
  return (
    <div className="card-productos">
      <h2>{title}</h2>
      <p>Precio: $ {price}</p>
      <div>
        <div style={{ padding: "1rem", textAlign: "center" }}>Imagen</div>
        <div className="img-container">
          <img src={image} alt="Sin imagen" />
        </div>
      </div>
      <div>
        <div style={{ padding: "1rem 0", textAlign: "center" }}>
          Descripción
        </div>
        <div
          className="cuerpo-productos"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
    </div>
  );
};

export default ProductosItem;
