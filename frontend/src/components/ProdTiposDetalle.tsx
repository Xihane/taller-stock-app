import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idProductoTipo: number;
}

const ProdTiposDetalle = ({ idProductoTipo }: Props) => {
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState(true); // por defecto activo
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (idProductoTipo <= 0 || isNaN(idProductoTipo)) {
        setError("ID inválido. Solo se permiten números positivos.");
        setDescripcion("");
        return;
      }

      setCargando(true);
      setError("");

      try {
        const res = await api.get(`/productos-tipos/${idProductoTipo}`);

        // Validar si realmente devolvió un objeto válido
        if (!res.data || !res.data.descripcion) {
          setError("No se encontró el tipo de producto.");
          setDescripcion("");
          return;
        }

        setDescripcion(res.data.descripcion || "");
        setEstado(res.data.estado === "AC"); // adaptar si viene como "AC" o booleano
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
        setDescripcion(""); // limpiar datos anteriores si hubo error
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [idProductoTipo]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!descripcion) return null;

  return (
    <div className="container">
      <h2>Detalles del Producto Tipo</h2>
      <p><strong>ID:</strong> {idProductoTipo}</p>
      <p><strong>Descripción:</strong> {descripcion}</p>
      <p><strong>Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
    </div>
  );
};

export default ProdTiposDetalle;
