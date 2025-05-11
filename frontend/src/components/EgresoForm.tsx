import { useState } from "react";
import api from "../services/api";

const EgresoForm = () => {
  const [form, setForm] = useState({
    idProducto: 0,
    cantidad: 1,
    idDeposito: 0,
    idVehiculo: 0,
    fechaEgreso: "",
    destinoTipo: "",
    destinoValor: "",
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
    if (form.idVehiculo <= 0) return setError("Seleccioná un vehículo válido.");
    if (!form.fechaEgreso) return setError("Ingresá una fecha de Egreso válida.");
    if (!form.destinoTipo) return setError("Ingresá un tipo de destino.");
    if (!form.destinoValor) return setError("Ingresá un valor de destino.");

    try {
      await api.post("/stock-Egresado/", form);
      alert("Egreso registrado correctamente");
      setForm({
        idProducto: 0,
        cantidad: 1,
        idDeposito: 0,
        idVehiculo: 0,
        fechaEgreso: "",
        destinoTipo: "",
        destinoValor: "",
      });
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Error desconocido al registrar el Egreso.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Registrar nuevo Egreso</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Producto (ID):</label>
        <input type="number" name="idProducto" value={form.idProducto} onChange={handleChange} required />
      </div>

      <div>
        <label>Cantidad:</label>
        <input type="number" name="cantidad" value={form.cantidad} onChange={handleChange} required />
      </div>

      <div>
        <label>Depósito (ID):</label>
        <input type="number" name="idDeposito" value={form.idDeposito} onChange={handleChange} required />
      </div>

      <div>
        <label>Vehículo (ID):</label>
        <input type="number" name="idVehiculo" value={form.idVehiculo} onChange={handleChange} required />
      </div>

      <div>
        <label>Fecha de Egreso:</label>
        <input type="date" name="fechaEgreso" value={form.fechaEgreso} onChange={handleChange} required />
      </div>

      <div>
        <label>Destino Tipo:</label>
        <input type="text" name="destinoTipo" value={form.destinoTipo} onChange={handleChange} required />
      </div>

      <div>
        <label>Destino Valor:</label>
        <input type="text" name="destinoValor" value={form.destinoValor} onChange={handleChange} required />
      </div>

      <div style={{ marginTop: 10 }}>
        <button type="submit">Registrar Egreso</button>
      </div>
    </form>
  );
};

export default EgresoForm;