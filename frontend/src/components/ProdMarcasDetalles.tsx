import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idProductoMarca: number;
}

const ProductosMarcasDetalles = ({ idProductoMarca }: Props) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
  const [estado, setEstado] = useState(true); // por defecto activo

  useEffect(() => {
    const fetchData = async () => {
      
        if (idProductoMarca <= 0 || isNaN(idProductoMarca)) {
          setError("ID inválido. Solo se permiten números positivos.");
          setNombre("");
          return;
        }

        setCargando(true);
        setError("");


      try {



        const res = await api.get(`/productos-marcas/${idProductoMarca}`);

        if (!res.data || !res.data.nombre) {
          setError("No se encontró el tipo de producto.");
          setNombre("");
          return;
        }

        setNombre(res.data.nombre || "");
        setEstado(res.data.estado === "AC"); // suponer que viene como 1 o 0
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
        setNombre("");

      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [idProductoMarca]);
    if (cargando) return <p>Cargando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!nombre) return null;
    return (
        <div className="container">
            <h2>Detalles de la Marca</h2>
            <p><strong>ID:</strong> {idProductoMarca}</p>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
        </div>
    );
};
export default ProductosMarcasDetalles;
