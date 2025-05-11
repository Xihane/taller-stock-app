import { useState } from "react";
import api from "../services/api";

const IngresoForm = () => {
  const [form, setForm] = useState({
    idProducto: 0,
    cantidad: 1,
    idDeposito: 0,
    fechaIngreso: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.idProducto <= 0) return setError("Seleccioná un producto válido.");
    if (form.cantidad <= 0) return setError("La cantidad debe ser mayor a 0.");
    if (form.idDeposito <= 0) return setError("Seleccioná un depósito válido.");
    if (!form.fechaIngreso) return setError("Ingresá una fecha de ingreso válida.");

    try {
      await api.post("/stock-ingresado/", form);
      alert("Ingreso registrado correctamente");
      setForm({
        idProducto: 0,
        cantidad: 1,
        idDeposito: 0,
        fechaIngreso: "",
      });
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error desconocido al registrar el ingreso.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar nuevo ingreso</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Producto (ID):</label>
        <input
          type="number"
          name="idProducto"
          value={form.idProducto}
          onChange={handleChange}
          placeholder="Ej: 1"
          required
        />
      </div>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          placeholder="Ej: 10"
          required
        />
      </div>

      <div>
        <label>Depósito (ID):</label>
        <input
          type="number"
          name="idDeposito"
          value={form.idDeposito}
          onChange={handleChange}
          placeholder="Ej: 2"
          required
        />
      </div>

      <div>
        <label>Fecha de ingreso:</label>
        <input
          type="date"
          name="fechaIngreso"
          value={form.fechaIngreso}
          onChange={handleChange}
          required
        />
      </div>



      <div style={{ marginTop: 10 }}>
        <button type="submit">Registrar ingreso</button>
      </div>
    </form>
  );
};

export default IngresoForm;
