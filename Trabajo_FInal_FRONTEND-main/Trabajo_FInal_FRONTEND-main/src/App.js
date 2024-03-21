import Productos from "./pages/Productos";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SobreNosotros from "./pages/SobreNosotros";
import Contacto from "./pages/Contacto";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
export default App;
