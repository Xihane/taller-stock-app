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
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "cantidad" || name === "idProducto" || name === "idDeposito" || name === "idVehiculo"
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
    <div className="container">
      <h3>Registrar nuevo Egreso</h3>

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
            placeholder="Ej: 5"
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
          <label>Vehículo (ID):</label>
          <input
            type="number"
            className="form-control"
            name="idVehiculo"
            value={form.idVehiculo}
            onChange={handleChange}
            required
            placeholder="Ej: 3"
          />
        </div>

        <div className="form-group">
          <label>Fecha de Egreso:</label>
          <input
            type="date"
            className="form-control"
            name="fechaEgreso"
            value={form.fechaEgreso}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Destino Tipo:</label>
          <input
            type="text"
            className="form-control"
            name="destinoTipo"
            value={form.destinoTipo}
            onChange={handleChange}
            required
            placeholder="Ej: Taller"
          />
        </div>

        <div className="form-group">
          <label>Destino Valor:</label>
          <input
            type="text"
            className="form-control"
            name="destinoValor"
            value={form.destinoValor}
            onChange={handleChange}
            required
            placeholder="Ej: Taller Central"
          />
        </div>

        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Registrar Egreso</button>
        </div>
      </form>
    </div>
  );
};

export default EgresoForm;
