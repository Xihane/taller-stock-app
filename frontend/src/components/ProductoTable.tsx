import { useEffect, useState } from "react";
import api from "../services/api";

interface Producto {
  id: number;
  nombre: string;
  idProductoMarca: number;
  idProductoTipo: number;
  marcaNombre: string;
  tipoProductoDescripcion: string;
}


interface Props {
  onEditar?: (id: number) => void;
  onEliminar?: (id: number) => void;
}

const ProductoTable = ({ onEditar, onEliminar }: Props) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState("");

  const fetchProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (err) {
      setError("Error al obtener productos.");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

    try {
      await api.delete(`/productos/${id}`);
      // Actualiza la tabla
      setProductos(productos.filter((p) => p.id !== id));
      if (onEliminar) onEliminar(id);
    } catch (err) {
      alert("Error al eliminar el producto.");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container text-center">
      
      {error && <p style={{ color: "red" }}>{error}</p>}

<table className="custom-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Marca</th>
      <th>Tipo de Producto</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {productos.map((p) => (
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.nombre}</td>
        <td>{p.marcaNombre}</td>
        <td>{p.tipoProductoDescripcion}</td>
        <td>
          <button onClick={() => onEditar && onEditar(p.id)}>Editar</button>
          <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default ProductoTable;
