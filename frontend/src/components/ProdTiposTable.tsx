import { useEffect, useState } from "react";
import api from "../services/api";

interface ProductoTipo {
  idProductoTipo: number;
  descripcion: string;
}

interface Props {
  onEditar?: (id: number) => void;
  onEliminar?: (id: number) => void;
}

const ProductosTiposTable = ({ onEditar, onEliminar }: Props) => {
  const [productosTipos, setProductosTipos] = useState<ProductoTipo[]>([]);
  const [error, setError] = useState("");

  const fetchProductosTipos = async () => {
    try {
      const res = await api.get("/productos-tipos");
      setProductosTipos(res.data);
    } catch (err) {
      setError("Error al obtener productos tipos.");
    }
  };

  const handleEliminar = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este producto tipo?")) return;

    try {
      await api.delete(`/productos-tipos/${id}`);
      // Actualiza la tabla
      setProductosTipos(productosTipos.filter((p) => p.idProductoTipo !== id));
      if (onEliminar) onEliminar(id);
    } catch (err) {
      alert("Error al eliminar el producto tipo.");
    }
  };
  useEffect(() => {
    fetchProductosTipos();
  }, []);

  return (
    <div className="container text-center">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosTipos.map((productoTipo) => (
            <tr key={productoTipo.idProductoTipo}>
              <td>{productoTipo.idProductoTipo}</td>
              <td>{productoTipo.descripcion}</td>
              <td>
                {onEditar && (
                  <button onClick={() => onEditar(productoTipo.idProductoTipo)}>Editar</button>
                )}
                {onEliminar && (
                  <button onClick={() => handleEliminar(productoTipo.idProductoTipo)}>Eliminar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductosTiposTable;
