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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "cantidad" || name === "idProducto" || name === "idDeposito"
        ? Number(value)
        : value,
    }));
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
    <div className="container">
      <h3>Registrar nuevo ingreso</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Producto (ID):</label>
          <input
            type="number"
            className="form-control"
            name="idProducto"
            value={form.idProducto}
            onChange={handleChange}
            required
            placeholder="Ej: 1"
          />
        </div>

        <div className="form-group">
          <label>Cantidad:</label>
          <input
            type="number"
            className="form-control"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            required
            placeholder="Ej: 10"
          />
        </div>

        <div className="form-group">
          <label>Depósito (ID):</label>
          <input
            type="number"
            className="form-control"
            name="idDeposito"
            value={form.idDeposito}
            onChange={handleChange}
            required
            placeholder="Ej: 2"
          />
        </div>

        <div className="form-group">
          <label>Fecha de ingreso:</label>
          <input
            type="date"
            className="form-control"
            name="fechaIngreso"
            value={form.fechaIngreso}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Registrar ingreso</button>
        </div>
      </form>
    </div>
  );
};

export default IngresoForm;
