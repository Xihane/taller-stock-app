import { useEffect, useState } from 'react';
import api from '../services/api';
import EgresoForm from '../components/EgresoForm';

interface Egreso {
  idStockEgresado: number;
  idProducto: number;
  producto: string;
  cantidad: number;
  idDeposito: number;
  deposito: string;
  idVehiculo: number;
    vehiculo: string;
    destinoTipo: string;
    destinoValor: string;
  fechaEgreso: string;
  estado: string;
}

const Egresos = () => {
  const [Egresos, setEgresos] = useState<Egreso[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEgresos = async () => {
    try {
      const res = await api.get('/stock-egresado/');
      console.table(res.data); // data es el array de productos
      setEgresos(res.data);
      
    } catch (error) {
      console.error("Error al obtener Egresos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgresos();
  }, []);

  return (
    <div className='container'>
  <h1>Listado de Egresos</h1>
  <EgresoForm />
  <hr />
  {loading ? (
    <p>Cargando Egresos...</p>
  ) : Egresos.length === 0 ? (
    <p>No hay Egresos registrados.</p>
  ) : (
    <table className='custom-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Nombre del producto</th>
          <th>Cantidad</th>
          <th>Depósito</th>
          <th>Nombre Depósito</th>
          <th>Vehículo</th>
          <th>Fecha</th>
          <th>Destino Tipo</th>
          <th>Destino Valor</th>
        </tr>
      </thead>
      <tbody>
        {Egresos.map((egreso) => (
          <tr key={egreso.idStockEgresado}>
            <td>{egreso.idStockEgresado}</td>
            <td>{egreso.idProducto}</td>
            <td>{egreso.producto}</td>
            <td>{egreso.cantidad}</td>
            <td>{egreso.idDeposito}</td>
            <td>{egreso.deposito}</td>
            <td>{egreso.idVehiculo ? egreso.vehiculo || "Sin vehículo" : "No asignado"}</td>
            <td>{egreso.fechaEgreso ? new Date(egreso.fechaEgreso).toLocaleDateString() : "Sin fecha"}</td>
            <td>{egreso.destinoTipo || "No especificado"}</td>
            <td>{egreso.destinoValor || "No especificado"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    
  );
};

export default Egresos;
