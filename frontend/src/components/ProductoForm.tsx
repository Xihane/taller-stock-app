import { useState } from "react";
import api from "../services/api";

const initialForm = {
  nombre: "",
  idMarca: 0,
  idTipo: 0
};

const ProductoForm = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.nombre || form.idMarca <= 0 || form.idTipo <= 0) {
      return setError("Completa todos los campos correctamente.");
    }

    try {
      await api.post("/productos", form);
      setForm(initialForm);
      alert("Producto agregado correctamente");
    } catch (err) {
      setError("Error al agregar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Agregar producto</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="nombre"
        placeholder="Nombre del producto"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        name="idMarca"
        type="number"
        placeholder="ID Marca"
        value={form.idMarca}
        onChange={handleChange}
      />
      <input
        name="idTipo"
        type="number"
        placeholder="ID Tipo"
        value={form.idTipo}
        onChange={handleChange}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ProductoForm;
