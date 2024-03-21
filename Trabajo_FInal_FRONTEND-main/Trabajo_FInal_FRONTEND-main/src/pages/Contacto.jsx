import React, { useState } from "react";
import axios from "axios";

const Contacto = () => {
  const initialForm = {
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  };

  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSending(true);
    const res = await axios.post(
      "http://localhost:4000/api/contacto",
      formData
    );
    setSending(false);
    setMsg(res.data.message);
    if (res.data.error === false) {
      setFormData(initialForm);
    }
  };

  return (
    <section className="sec-contacto">
      <h1 className="title-contacto">Contactanos</h1>
      <div>
        <p className="text-contacto">
          Si tienes alguna duda o problema, no dudes en escribirnos.
        </p>
      </div>
      <form className="form-contacto" onSubmit={handleSubmit}>
        <div>
          <input
            className="input-contacto"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="input-contacto"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            className="input-contacto"
            type="number"
            name="telefono"
            placeholder="Telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            className="input-contacto textarea-contacto"
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {sending ? (
          <p className="msg-mail">Su mensaje se esta enviando...</p>
        ) : null}
        {msg ? <p>{msg}</p> : null}
        <button className="btn" type="submit" value="Enviar">
          Enviar
        </button>
      </form>
    </section>
  );
};

export default Contacto;
