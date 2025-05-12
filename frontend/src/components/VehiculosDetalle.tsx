import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idVehiculo: number;
}

const VehiculosDetalle = ({ idVehiculo }: Props) => {
  const [vehiculo, setVehiculo] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  useEffect(() => {
    const fetchVehiculo = async () => {
      if (!idVehiculo) return; // Si no hay ID, no hacemos la solicitud

      setLoading(true); // Iniciamos el estado de carga
      setError(""); // Limpiamos errores anteriores

      try {
        const res = await api.get(`/vehiculos/${idVehiculo}`);
        
        if (res.data) {
          setVehiculo(res.data);
        } else {
          setError("No se encontró el vehículo.");
          setVehiculo(null);
        }
      } catch (err) {
        console.error("Error al obtener el vehículo:", err);
        setError("No se pudo cargar el vehículo o es inexistente.");
        setVehiculo(null);
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    fetchVehiculo();
  }, [idVehiculo]);  

  if (loading) return <p>Cargando vehículo...</p>; // Mostrar mensaje de carga
  if (error) return <p style={{ color: "red" }}>{error}</p>; // Mostrar mensaje de error
  if (!vehiculo) return null;

  return (
    <div className="container">
      <h3>Detalle del Vehículo</h3>
      <table className="custom-table">
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{vehiculo.idVehiculo}</td>
          </tr>
          <tr>
            <td><strong>Patente:</strong></td>
            <td>{vehiculo.dominio}</td>
          </tr>
          <tr>
            <td><strong>Modelo:</strong></td>
            <td>{vehiculo.modelo}</td>
          </tr>
          <tr>
            <td><strong>ID Marca:</strong></td>
            <td>{vehiculo.idMarca}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VehiculosDetalle;