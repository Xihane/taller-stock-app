import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idDeposito: number;
  onCancel?: () => void;
  onUpdated?: () => void;
}

const DepositosEditarForm = ({ idDeposito, onCancel, onUpdated }: Props) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState(true); // por defecto activo
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/depositos/${idDeposito}`);
        setNombre(res.data.nombre || "");
        setUbicacion(res.data.ubicacion || "");
        setEstado(res.data.estado === "AC");
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [idDeposito]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!ubicacion.trim()) {
      setError("La ubicación es obligatoria.");
      return;
    }

    try {
      await api.put(`/depositos/${idDeposito}`, {
        nombre,
        ubicacion,
        estado: "AC"
      });

      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("Error al actualizar el depósito:", err);
      setError("Error al actualizar el depósito.");
    }
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!nombre) return null;

  return (
    <div className="container">
      <h2>Editar Depósito</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ubicacion" className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            id="ubicacion"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </div>
        <button type="submit" >Guardar</button>
        {onCancel && (
          <button type="button"  onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default DepositosEditarForm;
