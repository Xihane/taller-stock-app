import { useEffect, useState } from "react";
import api from "../services/api";

interface Producto {
  id: number;
  nombre: string;
  idMarca: number;
  idTipo: number;
}

const ProductoTable = () => {
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

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <h3>Listado de productos</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>ID Marca</th>
            <th>ID Tipo</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.idMarca}</td>
              <td>{p.idTipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoTable;
