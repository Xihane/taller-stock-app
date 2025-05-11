import { useState } from "react";
import api from "../services/api";

interface Props {
  onCancel?: () => void;
  onCreated?: () => void;
}

const ProductoTiposForm = ({ onCancel, onCreated }: Props) => {
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion.trim()) {
      alert("El campo descripción es obligatorio.");
      return;
    }

    try {
      const payload = {
        descripcion: descripcion.trim(),
        estado: "AC", // Estado fijo
      };

      const response = await api.post("/productos-tipos", payload);
      console.log("Producto tipo creado:", response.data);
      alert("Producto tipo creado exitosamente.");
      setDescripcion("");

      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error al crear producto tipo:", err);
      alert("Error al crear producto tipo.");
    }
  };

  return (
    <div className="container">

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
          <button type="submit" className="button">Crear</button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="button button-secondary" style={{ marginLeft: "1rem" }}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductoTiposForm;
