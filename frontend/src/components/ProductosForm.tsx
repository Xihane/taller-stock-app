import { useState, useEffect } from "react";
import api from "../services/api";

interface ProductoMarca {
  idProductoMarca: number;
  nombre: string;
}

interface ProductoTipo {
  idProductoTipo: number;
  descripcion: string;
}

const ProductoForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado] = useState("AC"); // Estado fijo al crear
  const [idProductoMarca, setIdProductoMarca] = useState<number>(0);
  const [idProductoTipo, setIdProductoTipo] = useState<number>(0);
  const [ProductoMarcas, setProductoMarcas] = useState<ProductoMarca[]>([]);
  const [tipos, setTipos] = useState<ProductoTipo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const [tiposRes, marcasRes] = await Promise.all([api.get("/productos-tipos"), api.get("/productos-marcas"),
        ]);
        setTipos(tiposRes.data || []);
        setProductoMarcas(marcasRes.data || []);
        console.table(marcasRes)
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

    if (!nombre || !descripcion || idProductoMarca <= 0 || idProductoTipo <= 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const payload = {
        nombre,
        descripcion,
        estado,
        idMarca: idProductoMarca,
        idTipoProducto: idProductoTipo,
      };

      const response = await api.post("/productos", payload);
      console.log("Producto creado:", response.data);

      // Reiniciar formulario
      setNombre("");
      setDescripcion("");
      setIdProductoMarca(0);
      setIdProductoTipo(0);
      alert("Producto creado correctamente.");
    } catch (err) {
      console.error("Error al crear producto:", err);
      setError("Error al crear el producto.");
    }
  };

  return (
    <div className="container">
  {error && <p style={{ color: "red" }}>{error}</p>}

  <form onSubmit={handleSubmit} className="custom-form">
    
    <div className="form-group">
      <label>Nombre:</label>
      <input
        className="form-control"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Descripción:</label>
      <textarea
        className="form-control"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />
    </div>

    <div className="form-group">
      <label>Marca del producto:</label>
      <select
        className="form-control"
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

    <div className="form-group">
      <label>Tipo de Producto:</label>
      <select
        className="form-control"
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

    <button type="submit">Guardar</button>
  </form>
</div>

  );
};

export default ProductoForm;
