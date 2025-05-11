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
    // Verificar si el ID de producto es válido antes de hacer la búsqueda
    if (!idProducto || isNaN(Number(idProducto))) {
      alert("Por favor, ingrese un ID de producto válido.");
      return;
    }
  };

  return (
    <div>
      <h1>Reportes de Movimiento de Stock</h1>
      
      <div>
        <label>Fecha de Inicio:</label>
        <input
          type="date"
          name="startDate"
          value={filtroFecha.startDate}
          onChange={handleFilterChange}
        />
      </div>
      
      <div>
        <label>Fecha de Fin:</label>
        <input
          type="date"
          name="endDate"
          value={filtroFecha.endDate}
          onChange={handleFilterChange}
        />
      </div>

      <div>
        <label>ID del Producto:</label>
        <input
          type="number"
          name="idProducto"
          value={idProducto}
          onChange={handleProductoChange}
          placeholder="Ej: 1"
        />
      </div>

      <div>
        <button onClick={handleBuscarClick}>Buscar Historial</button>
      </div>
      
      <div>
        <h3>Movimientos Filtrados</h3>
        {idProducto && <MovimientoHistorial idProducto={Number(idProducto)} />}
      </div>
    </div>
  );
};

export default Reportes;
