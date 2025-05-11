import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
  idProducto: number;
  onCancel?: () => void;
  onUpdated?: () => void;
}

interface ProductoMarca {
  idProductoMarca: number;
  nombre: string;
}

interface ProductoTipo {
  idProductoTipo: number;
  descripcion: string;
}

const ProductoEditarForm = ({ idProducto, onCancel, onUpdated }: Props) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("AC");
  const [idProductoMarca, setIdProductoMarca] = useState<number>(0);
  const [idProductoTipo, setIdProductoTipo] = useState<number>(0);
  const [ProductoMarcas, setProductoMarcas] = useState<ProductoMarca[]>([]);
  const [tipos, setTipos] = useState<ProductoTipo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productoRes, tiposRes, ProductoMarcasRes] = await Promise.all([
          api.get(`/productos/${idProducto}`),
          api.get("/productos-tipos"),
          api.get("/productos-marcas"),
        ]);

        const prod = productoRes.data;
        // mostrar tabla



        setNombre(prod.nombre || "");
        setDescripcion(prod.descripcion || "");
        setEstado(prod.estado || "activo");
        setIdProductoMarca(Number(prod.idProductoMarca || 0));
        setIdProductoTipo(Number(prod.idProductoTipo || 0));

        setTipos(tiposRes.data || []);
        setProductoMarcas(ProductoMarcasRes.data || []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar los datos del formulario.");
      }
    };

    fetchData();
  }, [idProducto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || idProductoMarca <= 0 || idProductoTipo <= 0 || !estado) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
        await api.put(`/productos/${idProducto}`, {
        nombre,
        descripcion,
        estado,
        idMarca: idProductoMarca,
        idTipoProducto: idProductoTipo,
        });

      onUpdated?.();
      alert("Producto actualizado correctamente.");
    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("Error al actualizar el producto.");
    }
  };

  return (
    <div>
      <h3>Editar Producto (ID: {idProducto})</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Estado:</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

    <div>
    <label>ProductoMarca:</label>
    <select
        value={idProductoMarca}
        onChange={(e) => setIdProductoMarca(Number(e.target.value))}
        required
    >
    {(idProductoMarca === 0 || ProductoMarcas.length === 0) && (
    <option value={0}>-- Seleccionar --</option>
    )}

        {ProductoMarcas.map((m) => (
        <option key={m.idProductoMarca} value={m.idProductoMarca}>
            {m.idProductoMarca} - {m.nombre}
        </option>
        ))}
    </select>
    </div>

    <div>
    <label>Tipo de Producto:</label>
    <select
        value={idProductoTipo}
        onChange={(e) => setIdProductoTipo(Number(e.target.value))}
        required
    >
    {(idProductoTipo === 0 || tipos.length === 0) && (
    <option value={0}>-- Seleccionar --</option>
    )}


        {tipos.map((t) => (
        <option key={t.idProductoTipo} value={t.idProductoTipo}>
            {t.idProductoTipo} - {t.descripcion}
        </option>
        ))}
    </select>
    </div>


        <button type="submit">Guardar Cambios</button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ProductoEditarForm;
