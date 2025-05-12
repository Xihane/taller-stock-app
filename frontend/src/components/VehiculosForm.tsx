import { useState, useEffect } from "react";
import api from "../services/api";

interface VehiculoMarca {
  idMarca: number;
  nombre: string;
  tipo: string;
}


const VehiculoForm = () => {
  const [dominio, setDominio] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [estado] = useState("AC"); // Estado fijo al crear
  const [idVehiculoMarca, setIdVehiculoMarca] = useState<number>(0);
  const [vehiculoMarcas, setVehiculoMarcas] = useState<VehiculoMarca[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const marcasRes = await api.get("/productos-marcas");

      console.table(marcasRes.data); // Verificar qué datos llegan

      // Solo marcas de tipo 'vehiculo'
      const marcasVehiculos = marcasRes.data;

      setVehiculoMarcas(marcasVehiculos);
    } catch (err) {
      console.error("Error al cargar marcas:", err);
      setError("Error al cargar datos del formulario.");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dominio || !modelo || idVehiculoMarca <= 0 || !anio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const payload = {
        dominio,
        modelo,
        idMarca: idVehiculoMarca, // ✅ Nombre alineado con el backend
        anio: Number(anio),       // ✅ Conversión a número
      };

      const response = await api.post("/vehiculos", payload);
      console.log("Vehículo creado:", response.data);

      // Reiniciar formulario
      setDominio("");
      setModelo("");
      setIdVehiculoMarca(0);
      setAnio("");
      alert("Vehículo creado correctamente.");
    } catch (err) {
      console.error("Error al crear vehículo:", err);
      setError("Error al crear el vehículo.");
    }
  };

  return (
    <div className="container">
      {error && <p style={{ color: "red" }}>{error}</p>}


      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label>Patente:</label>
          <input
            className="form-control"
            value={dominio}
            onChange={(e) => setDominio(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Modelo:</label>
          <textarea
            className="form-control"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Año:</label>
          <input
            type="number"
            className="form-control"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Marca:</label>
          <select
            className="form-control"
            value={idVehiculoMarca}
            onChange={(e) => setIdVehiculoMarca(Number(e.target.value))}
            required
          >
            {(idVehiculoMarca === 0 || vehiculoMarcas.length === 0) && (
              <option value={0}>-- Seleccionar --</option>
            )}
            {vehiculoMarcas.map((m) => (
              <option key={m.idMarca} value={m.idMarca}>
                {m.nombre}
              </option>
            ))}
          </select>

        </div>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default VehiculoForm;