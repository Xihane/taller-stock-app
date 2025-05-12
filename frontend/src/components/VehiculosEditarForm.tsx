import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idVehiculo: number;
  onCancel?: () => void;
  onUpdated?: () => void;
}

interface VehiculoMarca {
  idMarca: number;
  nombre: string;
  tipo: string;
}

const VehiculoEditarForm = ({ idVehiculo, onCancel, onUpdated }: Props) => {
  const [dominio, setDominio] = useState("");
  const [modelo, setModelo] = useState("");
  const [anio, setAnio] = useState("");
  const [idVehiculoMarca, setIdVehiculoMarca] = useState<number>(0);
  const [vehiculoMarcas, setVehiculoMarcas] = useState<VehiculoMarca[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiculoRes, marcasRes] = await Promise.all([
          api.get(`/vehiculos/${idVehiculo}`),
          api.get("/productos-marcas"),
        ]);

        const vehi = vehiculoRes.data;
        console.log("Vehículo recibido:", vehi);

        setDominio(vehi.dominio || "");
        setModelo(vehi.modelo || "");
        setAnio(String(vehi.anio || ""));
        setIdVehiculoMarca(vehi.idMarca || 0);

        const marcasVehiculos = marcasRes.data 
        ;
        setVehiculoMarcas(marcasVehiculos);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
      }
    };

    fetchData();
  }, [idVehiculo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!dominio || !modelo || idVehiculoMarca <= 0 || !anio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await api.put(`/vehiculos/${idVehiculo}`, {
        dominio,
        modelo,
        idMarca: idVehiculoMarca,
        anio: Number(anio),
      });

      onUpdated?.();
      alert("Vehículo actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("Error al actualizar el vehículo.");
    }
  };

  return (
    <div className="container">
      <h3>Editar Vehículo (ID: {idVehiculo})</h3>
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
          <input
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
              value={0}
              
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

        <button type="submit" >Guardar Cambios</button>
        {onCancel && (
          <button type="button"  onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default VehiculoEditarForm;
