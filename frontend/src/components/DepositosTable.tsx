import { useEffect, useState } from "react";
import api from "../services/api";

interface Deposito {
    idDeposito: number;
    nombre: string;
    ubicacion: string;
}

interface Props {
  onEditar?: (id: number) => void;
  onEliminar?: (id: number) => void;
}

const DepositosTable = ({ onEditar, onEliminar }: Props) => {
  const [depositos, setDeposito] = useState<Deposito[]>([]);
  const [error, setError] = useState("");

  const fetchDepositos = async () => {
    try {
      const res = await api.get("/depositos");
      setDeposito(res.data);
    } catch (err) {
      setError("Error al obtener depositos.");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este Deposito?")) return;

    try {
      await api.delete(`/depositos/${id}`);
      // Actualiza la tabla
      setDeposito(depositos.filter((p) => p.idDeposito !== id));
      if (onEliminar) onEliminar(id);
    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };useEffect(() => {
    fetchDepositos();
  }, []);

 return (
    <div className="container text-center">
      
      {error && <p style={{ color: "red" }}>{error}</p>}

<table className="custom-table text-center">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Ubicación</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {depositos.map((p) => (
      <tr key={p.idDeposito}>
        <td>{p.idDeposito}</td>
        <td>{p.nombre}</td>
        <td>{p.ubicacion}</td>
        <td>
          <button onClick={() => onEditar && onEditar(p.idDeposito)}>Editar</button>
          <button onClick={() => handleEliminar(p.idDeposito)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default DepositosTable;
