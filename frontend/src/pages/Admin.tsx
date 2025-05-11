import { useState } from "react";
import ProductoForm from "../components/ProductoForm";
import ProductoTable from "../components/ProductoTable";
import ProductoEditarForm from "../components/ProductoEditarForm";
import ProductoDetalle from "../components/ProductoDetalle";

const entidades = [
  "Productos",
  "ProductosTipos",
  "ProductosMarcas",
  "Depósitos",
  "Vehículos"
];

const acciones = ["Listar", "Agregar", "Buscar"];

const Admin = () => {
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<string | null>(null);
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);
  const [productoIdBuscar, setProductoIdBuscar] = useState("");
  const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);

  const renderComponente = () => {
    if (entidadSeleccionada === "Productos") {
      switch (accionSeleccionada) {
        case "Listar":
          return (
            <ProductoTable
              onEditar={(id) => {
                setIdSeleccionado(id);
                setAccionSeleccionada("Editar");
              }}
              onEliminar={(id) => {
                setIdSeleccionado(id);
                setAccionSeleccionada("Eliminar");
              }}
            />
          );

        case "Agregar":
          return <ProductoForm />;

        case "Editar":
          return idSeleccionado !== null ? (
            <ProductoEditarForm
              idProducto={idSeleccionado}
              onCancel={() => {
                setAccionSeleccionada(null);
                setIdSeleccionado(null);
              }}
              onUpdated={() => {
                setAccionSeleccionada("Listar");
                setIdSeleccionado(null);
              }}
            />
          ) : (
            <p>Seleccioná un producto para editar.</p>
          );

        case "Eliminar":
          return idSeleccionado !== null ? (
            <p>Producto con ID {idSeleccionado} eliminado (simulado).</p>
          ) : (
            <p>Seleccioná un producto para eliminar.</p>
          );

        case "Buscar":
          return <ProductoDetalle id={Number(productoIdBuscar)} />;

        default:
          return <p>Acción no reconocida.</p>;
      }
    }
  };

  return (
    <div className="container text-center">
      <h1 className="title">Panel de Administración</h1>

      <div style={{ marginBottom: "1rem" }}>
        <h3>Seleccioná una entidad:</h3>
        {entidades.map((ent) => (
          <button
            key={ent}
            onClick={() => {
              setEntidadSeleccionada(ent);
              setAccionSeleccionada(null);
              setIdSeleccionado(null);
            }}
            className={`button ${entidadSeleccionada === ent ? "button-selected" : ""}`}
          >
            {ent}
          </button>
        ))}
      </div>

      {entidadSeleccionada && (
        <div style={{ marginBottom: "1rem" }}>
          <h4>{entidadSeleccionada} - Elegí una acción:</h4>
          {acciones.map((acc) => (
            <button
              key={acc}
              onClick={() => {
                setAccionSeleccionada(acc);
                setIdSeleccionado(null);
              }}
              className={`button ${accionSeleccionada === acc ? "button-selected" : ""}`}
            >
              {acc}
            </button>
          ))}
        </div>
      )}

      {/* Buscar por ID (solo si es Buscar y Productos) */}
      {accionSeleccionada === "Buscar" && entidadSeleccionada === "Productos" && (
        <div className="search-container">
          <input
            type="number"
            placeholder="ID del producto"
            value={productoIdBuscar}
            onChange={(e) => setProductoIdBuscar(e.target.value)}
            className="input-field"
          />
          <button onClick={() => renderComponente()} className="button">Buscar</button>
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        {entidadSeleccionada && accionSeleccionada && (
          <div>
            <h4 className="action-title">{accionSeleccionada} {entidadSeleccionada}</h4>
            {renderComponente()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
