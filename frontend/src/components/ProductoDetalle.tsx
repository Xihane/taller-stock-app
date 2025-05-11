import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  id: number;
}

const ProductoDetalle = ({ id }: Props) => {
  const [producto, setProducto] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return; // Si no hay ID, no hacemos la solicitud
      setLoading(true); // Iniciamos el estado de carga
      setError(""); // Limpiamos el error anterior
      try {
        const res = await api.get(`/productos/${id}`);
        setProducto(res.data);
      } catch {
        setError("No se pudo cargar el producto o es inexistente.");
        setProducto(null); // Limpiamos el producto si hay un error
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    fetchProducto();
  }, [id]); // Reejecutamos la solicitud solo si el ID cambia

  if (loading) return <p>Cargando producto...</p>; // Mostrar mensaje de carga

  if (error) return <p style={{ color: "red" }}>{error}</p>; // Mostrar mensaje de error

  if (!producto) return null; // No mostrar nada si no hay producto

  return (
    <div className="container">
      <h3>Detalle del Producto</h3>
      <table className="custom-table">
        <tbody>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{producto.id}</td>
          </tr>
          <tr>
            <td><strong>Nombre:</strong></td>
            <td>{producto.nombre}</td>
          </tr>
          <tr>
            <td><strong>Descripción:</strong></td>
            <td>{producto.descripcion}</td>
          </tr>
          <tr>
            <td><strong>ID Marca:</strong></td>
            <td>{producto.idMarca}</td>
          </tr>
          <tr>
            <td><strong>ID Tipo Producto:</strong></td>
            <td>{producto.idTipoProducto}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductoDetalle;
