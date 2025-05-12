import { useEffect, useState } from "react";
import api from "../services/api";

interface Vehiculo {
  idVehiculo: number;
  dominio: string;
  idProductoMarca: number;
  anio: string;
  modelo: string;
  idMarca: string;
}

interface Props {
  onEditar?: (id: number) => void;
  onEliminar?: (id: number) => void;
}

const VehiculoTable = ({ onEditar, onEliminar }: Props) => {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [error, setError] = useState("");

  const fetchVehiculos = async () => {
    try {
      const res = await api.get("/vehiculos");
      setVehiculos(res.data || []);
    } catch (err) {
      console.error("Error al obtener vehículos:", err);
      setError("Error al obtener vehículos.");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) return;

    try {
      await api.delete(`/vehiculos/${id}`);
      setVehiculos(vehiculos.filter((v) => v.idVehiculo !== id));
      if (onEliminar) onEliminar(id);
    } catch (err) {
      console.error("Error al eliminar vehículo:", err);
      alert("Error al eliminar el vehículo.");
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);

  return (
    <div className="container text-center">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Patente</th>
            <th>Marca</th>
            <th>Año</th>
            <th>Modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.idVehiculo}>
              <td>{v.idVehiculo}</td>
              <td>{v.dominio}</td>
              <td>{v.idMarca}</td>
              <td>{v.anio}</td>
              <td>{v.modelo}</td>
              <td>
                <button onClick={() => onEditar && onEditar(v.idVehiculo)}>Editar</button>
                <button onClick={() => handleEliminar(v.idVehiculo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehiculoTable;