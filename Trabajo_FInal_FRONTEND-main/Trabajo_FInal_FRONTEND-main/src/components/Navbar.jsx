import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="cabezera">
      <nav className="menu">
        <div>
          <h3 className="logo-menu">App Social</h3>
        </div>
        <ul className="lista">
          <Link to="/">
            <li className="link">Inicio</li>
          </Link>
          <Link to="/sobre-nosotros">
            <li className="link">Sobre Nosotros</li>
          </Link>
          <Link to="/productos">
            <li className="link">Productos</li>
          </Link>
          <Link to="/contacto">
            <li className="link">Contacto</li>
          </Link>
          <Link to="http://localhost:4000/">
            <li className="link active">Ir al Server</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
