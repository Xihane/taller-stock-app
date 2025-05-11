import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idDeposito: number;
}

const DepositoDetalle = ({ idDeposito }: Props) => {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState(true); // por defecto activo
  const [ubicacion, setUbicacion] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (idDeposito <= 0 || isNaN(idDeposito)) {
        setError("ID inválido. Solo se permiten números positivos.");
        setNombre("");
        return;
      }

      setCargando(true);
      setError("");

      try {
        const res = await api.get(`/depositos/${idDeposito}`);

        // Validar si realmente devolvió un objeto válido
        if (!res.data || !res.data.nombre || !res.data.ubicacion) {
          setError("No se encontró el tipo de deposito.");
          setNombre("");
          return;
        }

        setNombre(res.data.nombre || "");
        setUbicacion(res.data.ubicacion || "");
        setEstado(res.data.estado === "AC"); 
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
        setNombre(""); 
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [idDeposito]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!nombre) return null;

  return (
    <div className="container">
      <h2>Detalles del Deposito</h2>
      <p><strong>ID:</strong> {idDeposito}</p>
      <p><strong>Nombre:</strong> {nombre}</p>
      <p><strong>Ubicación:</strong>{ubicacion}</p>
      <p><strong>Estado:</strong> {estado ? "Activo" : "Inactivo"}</p>
    </div>
  );
};

export default DepositoDetalle;
