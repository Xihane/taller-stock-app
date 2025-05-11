import { useEffect, useState } from 'react';
import api from '../services/api';
import IngresoForm from '../components/IngresoForm';

interface Ingreso {
  idStockIngresado: number;
  idProducto: number;
  cantidad: number;
  idDeposito: number;
  fechaIngreso: string;
  destinoTipo: string;
  destinoValor: string;
  estado: string;
}

const Ingresos = () => {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIngresos = async () => {
    try {
      const res = await api.get('/stock-funciones/disponible');
      console.log(res.data); // <-- Acá vas a ver la forma real de cada objeto ingreso
      setIngresos(res.data);
    } catch (error) {
      console.error("Error al obtener ingresos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngresos();
  }, []);

  return (
    <div>
      <h1>Listado de Ingresos</h1>
      <IngresoForm />
      <hr />
      {loading ? (
        <p>Cargando ingresos...</p>
      ) : ingresos.length === 0 ? (
        <p>No hay ingresos registrados.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Depósito</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ing) => (
              <tr key={ing.idStockIngresado}>
                <td>{ing.idStockIngresado}</td>
                <td>{ing.idProducto}</td>
                <td>{ing.cantidad}</td>
                <td>{ing.idDeposito}</td>
                <td>{ing.fechaIngreso ? new Date(ing.fechaIngreso).toLocaleDateString() : "Sin fecha"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Ingresos;
