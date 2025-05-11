import { useEffect, useState } from "react";
import api from "../services/api";

interface Movimiento {
  tipo: string;
  cantidad: number;
  fecha: string;
  idDeposito: number;
  idVehiculo: number | null;
}

interface MovimientoHistorialProps {
  idProducto: number;
}

const MovimientoHistorial = ({ idProducto }: MovimientoHistorialProps) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        const response = await api.get(`/stock-funciones/movimientos/${idProducto}`);
        setMovimientos(response.data);
      } catch (err) {
        setError("Error al obtener los movimientos.");
      }
    };

    if (idProducto) {
      fetchMovimientos();
    }
  }, [idProducto]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Historial de movimientos</h3>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Depósito</th>
            <th>Vehículo</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento, index) => (
            <tr key={index}>
              <td>{movimiento.tipo}</td>
              <td>{movimiento.cantidad}</td>
              <td>{movimiento.fecha}</td>
              <td>{movimiento.idDeposito}</td>
              <td>{movimiento.idVehiculo || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovimientoHistorial;
