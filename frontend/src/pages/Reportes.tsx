import { useState } from "react";
import MovimientoHistorial from "../components/MovimientoHistorial";

const Reportes = () => {
  const [filtroFecha, setFiltroFecha] = useState({ startDate: "", endDate: "" });
  const [idProducto, setIdProducto] = useState<number | string>("");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroFecha({ ...filtroFecha, [e.target.name]: e.target.value });
  };

  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdProducto(e.target.value);
  };

  const handleBuscarClick = () => {
    if (!idProducto || isNaN(Number(idProducto))) {
      alert("Por favor, ingrese un ID de producto válido.");
      return;
    }
  };

  return (
    <div className="container">
      <h3>Reportes de Movimiento de Stock</h3>

      <form className="custom-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            value={filtroFecha.startDate}
            onChange={handleFilterChange}
          />
        </div>

        <div className="form-group">
          <label>Fecha de Fin:</label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            value={filtroFecha.endDate}
            onChange={handleFilterChange}
          />
        </div>

        <div className="form-group">
          <label>ID del Producto:</label>
          <input
            type="number"
            className="form-control"
            name="idProducto"
            value={idProducto}
            onChange={handleProductoChange}
            placeholder="Ej: 1"
          />
        </div>

        <div>
          <button type="button" onClick={handleBuscarClick}>
            Buscar Historial
          </button>
        </div>
      </form>

      <div>
        {idProducto && <MovimientoHistorial idProducto={Number(idProducto)} />}
      </div>
    </div>
  );
};

export default Reportes;
