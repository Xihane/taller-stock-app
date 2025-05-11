import { useEffect, useState } from "react";
import api from "../services/api";

interface ProductoMarca {
    idProductoMarca: number;
    nombre: string;
    }

interface Props {
    onEditar?: (id: number) => void;
    onEliminar?: (id: number) => void;
}

const ProductosMarcasTable = ({ onEditar, onEliminar }: Props) => {
    const [productosMarcas, setProductosMarcas] = useState<ProductoMarca[]>([]);
    const [error, setError] = useState("");

    const fetchProductosMarcas = async () => {
        try {
            const res = await api.get("/productos-marcas");
            setProductosMarcas(res.data);
        } catch (err) {
            setError("Error al obtener productos marcas.");
        }
    };

    const handleEliminar = async (id: number) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta marca?")) return;

        try {
            await api.delete(`/productos-marcas/${id}`);
            // Actualiza la tabla
            setProductosMarcas(productosMarcas.filter((p) => p.idProductoMarca !== id));
            if (onEliminar) onEliminar(id);
        } catch (err) {
            alert("Error al eliminar la marca.");
        }
    };

    useEffect(() => {
        fetchProductosMarcas();
    }, []);

    return (
        <div className="container text-center">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table className="custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosMarcas.map((productoMarca) => (
                        <tr key={productoMarca.idProductoMarca}>
                            <td>{productoMarca.idProductoMarca}</td>
                            <td>{productoMarca.nombre}</td>
                            <td>
                                {onEditar && (
                                    <button
                                        
                                        onClick={() => onEditar(productoMarca.idProductoMarca)}
                                    >
                                        Editar
                                    </button>
                                )}
                                &nbsp;
                                {onEliminar && (
                                    <button
                                        
                                        onClick={() => handleEliminar(productoMarca.idProductoMarca)}
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductosMarcasTable;