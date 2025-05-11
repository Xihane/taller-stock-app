import { useEffect, useState } from "react";
import api from "../services/api";

interface Props {
    idProductoMarca: number;
    onCancel?: () => void;
    onUpdated?: () => void;
}

const ProductosMarcasEditarForm = ({ idProductoMarca, onCancel, onUpdated }: Props) => {
    const [nombre, setNombre] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const [estado, setEstado] = useState(true); // por defecto activo

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get(`/productos-marcas/${idProductoMarca}`);
                setNombre(res.data.nombre || "");
                setEstado(res.data.estado === "AC"); // suponer que viene como 1 o 0
            } catch (err) {
                console.error("Error al cargar datos:", err);
                setError("Error al cargar los datos del formulario.");
            } finally {
                setCargando(false);
            }
        };

        fetchData();
    }, [idProductoMarca]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) {
            setError("El nombre es obligatorio.");
            return;
        }

        try {
            await api.put(`/productos-marcas/${idProductoMarca}`, {
                nombre,
                estado: "AC"
            });

            if (onUpdated) onUpdated();
        } catch (err) {
            console.error("Error al actualizar la marca:", err);
            setError("Error al actualizar la marca.");
        }
    };
    if (cargando) return <p>Cargando...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!nombre) return null;

    return (
        <div className="container">
            <h2>Editar Marca</h2>
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
                <button type="submit" className="btn btn-primary">Guardar</button>
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </form>
        </div>
    );
}
export default ProductosMarcasEditarForm;
