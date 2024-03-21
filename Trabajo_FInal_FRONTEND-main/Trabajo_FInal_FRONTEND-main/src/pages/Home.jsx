import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="sec-home">
      <h1 className="title-home">Bienvenido/a a nuestra tienda online</h1>
      <div className="text-home">
        <p>
          En esta app puedes vender productos de forma muy facil de editar y
          agregarlos.
        </p>
      </div>
      <Link className="btn" to="/productos">
        Comenzar!
      </Link>
    </section>
  );
};

export default Home;
