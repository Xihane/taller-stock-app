import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idProductoTipo: number;
  onCancel?: () => void;
  onUpdated?: () => void;
}


const ProductosTiposEditarForm = ({ idProductoTipo, onCancel, onUpdated }: Props) => {
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);
const [estado, setEstado] = useState(true); // por defecto activo

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get(`/productos-tipos/${idProductoTipo}`);
      setDescripcion(res.data.descripcion || "");
      setEstado(res.data.estado === "AC"); // suponer que viene como 1 o 0
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error al cargar los datos del formulario.");
    } finally {
      setCargando(false);
    }
  };

  fetchData();
}, [idProductoTipo]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!descripcion.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }

    try {


      await api.put(`/productos-tipos/${idProductoTipo}`, {
        descripcion,
        estado: "AC"
      });

      if (onUpdated) onUpdated();
    } catch (err) {
      console.error("Error al actualizar el producto tipo:", err);
      setError("Error al actualizar el producto tipo.");
    }
  };

  if (cargando) return <p>Cargando...</p>;

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="descripcion">Tipo de producto</label>
          <input
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="input-field"
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button type="submit" className="button">Actualizar</button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="button button-secondary"
              style={{ marginLeft: "1rem" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductosTiposEditarForm;
