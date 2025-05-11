import { useState, useEffect } from "react";
import api from "../services/api";

// Interfaz para props del componente
interface Props {
  onCancel?: () => void;
  onCreated?: () => void;
}

interface Deposito {
  idDeposito: number;
  nombre: string;
  ubicacion: string;
}

const DepositosForm = ({ onCancel, onCreated }: Props) => {
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado] = useState("AC"); // Estado fijo al crear
  const [depositos, setDepositos] = useState<Deposito[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/depositos");
        setDepositos(res.data || []);
      } catch (err) {
        console.error("Error al cargar listas:", err);
        setError("Error al cargar datos del formulario.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre || !ubicacion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const payload = {
        nombre,
        ubicacion,
        estado,
      };

      const response = await api.post("/depositos", payload);
      console.log("Deposito creado:", response.data);

      if (onCreated) onCreated(); // avisar al padre que se creó
    } catch (err) {
      console.error("Error al crear el deposito:", err);
      setError("Error al crear el deposito.");
    }
  };

  return (
    <div className="container">
      <h2>Agregar Depósito</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
        <button type="submit" className="btn btn-primary">Agregar Depósito</button>
        {onCancel && (
          <button type="button" className="btn btn-secondary ms-2" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>

      
    </div>
  );
};

export default DepositosForm;
