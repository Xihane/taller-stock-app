import { useState } from "react";
import api from "../services/api";

interface Props {
  onCancel?: () => void;
  onCreated?: () => void;
}

const ProductoMarcasForm = ({ onCancel, onCreated }: Props) => {
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim()) {
      alert("El campo nombre es obligatorio.");
      return;
    }

    try {
      const payload = {
        nombre: nombre.trim(),
        estado: "AC", // Estado fijo
      };

      const response = await api.post("/productos-marcas", payload);
      console.log("Producto marca creado:", response.data);
      alert("Producto marca creado exitosamente.");
      setNombre("");

      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error al crear producto marca:", err);
      alert("Error al crear producto marca.");
    }
  };

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="nombre">Marca de producto</label>
            <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input-field"
            />
            </div>
            <div style={{ marginTop: "1rem" }}>
            <button type="submit" className="button">Crear</button>
            {onCancel && (
                <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
                Cancelar
                </button>
            )}
            </div>
        </form>
        </div>
    );

}
export default ProductoMarcasForm;