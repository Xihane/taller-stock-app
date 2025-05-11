import { useState } from "react";
import ProductoForm from "../components/ProductosForm";
import ProductoTable from "../components/ProductoTable";
import ProductoEditarForm from "../components/ProductoEditarForm";
import ProductoDetalle from "../components/ProductoDetalle";
import ProductoTiposForm from "../components/ProdTiposForm";
import ProductosTiposTable from "../components/ProdTiposTable";
import ProductosTiposEditar from "../components/ProdTiposEditarForm";
import ProductosTiposDetalles from "../components/ProdTiposDetalle";

import ProdMarcasForm from "../components/ProdMarcasForm";
import ProdMarcasTable from "../components/ProdMarcasTable";
import ProdMarcasEditarForm from "../components/ProdMarcasEditarForm";
import ProdMarcasDetalles from "../components/ProdMarcasDetalles";

import DepositoDetalle from "../components/DepositoDetalle";
import DepositosForm from "../components/DepositosForm";
import DepositosTable from "../components/DepositosTable";
import DepositosEditarForm from "../components/DepositosEditarForm";

const entidades = [
  "Productos",
  "Tipos de Productos",
  "Marcas de Productos",
  "Depósitos",
  "Vehículos"
];

const acciones = ["Listar", "Agregar", "Buscar"];

const Admin = () => {
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<string | null>(null);
  const [accionSeleccionada, setAccionSeleccionada] = useState<string | null>(null);
  const [idSeleccionado, setIdSeleccionado] = useState<number | null>(null);
  const [idBuscar, setIdBuscar] = useState(""); // reemplaza productoIdBuscar

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
            <p>Producto con ID {idSeleccionado} eliminado (baja).</p>
          ) : (
            <p>Seleccioná un producto para eliminar.</p>
          );

        case "Buscar":
          return <ProductoDetalle id={Number(idBuscar)} />;

        default:
          return <p>Acción no reconocida.</p>;
      }
    }
    
    // Agregamos soporte para TIPOS DE PRODUCTOS



    if (entidadSeleccionada === "Tipos de Productos") {
    switch (accionSeleccionada) {
      case "Listar":
        return (
          <ProductosTiposTable
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
        return (
          <ProductoTiposForm
            onCancel={() => setAccionSeleccionada(null)}
            onCreated={() => setAccionSeleccionada("Listar")}
          />
        );

      case "Editar":
        return idSeleccionado !== null ? (
          <ProductosTiposEditar
            idProductoTipo={idSeleccionado}
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
          <p>Seleccioná un tipo de producto para editar.</p>
        );

        case "Eliminar":
          return idSeleccionado !== null ? (
            <p>Tipo de producto con ID {idSeleccionado} eliminado (baja).</p>
          ) : (
            <p>Seleccioná un tipo de producto para eliminar.</p>
          );
          case "Buscar":
            return <ProductosTiposDetalles idProductoTipo={Number(idBuscar)} />;

      default:
        return <p>Acción no reconocida.</p>;
        }
      }

  // Agregamos soporte para MARCAS DE PRODUCTOS
  // su props es idProductoMarca

  if (entidadSeleccionada === "Marcas de Productos") {
    switch (accionSeleccionada) {
      case "Listar":
        return (
          <ProdMarcasTable
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
        return (
          <ProdMarcasForm
            onCancel={() => setAccionSeleccionada(null)}
            onCreated={() => setAccionSeleccionada("Listar")}
          />
        );

      case "Editar":
        return idSeleccionado !== null ? (
          <ProdMarcasEditarForm
            idProductoMarca={idSeleccionado}
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
          <p>Seleccioná una marca de producto para editar.</p>
        );

      case "Eliminar":
        return idSeleccionado !== null ? (
          <p>Marca de producto con ID {idSeleccionado} eliminado (baja).</p>
        ) : (
          <p>Seleccioná una marca de producto para eliminar.</p>
        );

      case "Buscar":
        return <ProdMarcasDetalles idProductoMarca={Number(idBuscar)} />;

      default:
        return <p>Acción no reconocida.</p>;
    }
  }


// soporte para DEPOSITOSS
  if (entidadSeleccionada === "Depósitos") {
    switch (accionSeleccionada) {
      case "Listar":
        return (
          <DepositosTable
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
        return (
          <DepositosForm
            onCancel={() => setAccionSeleccionada(null)}
            onCreated={() => setAccionSeleccionada("Listar")}
          />
        );

      case "Editar":
        return idSeleccionado !== null ? (
          <DepositosEditarForm
            idDeposito={idSeleccionado}
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
          <p>Seleccioná una marca de producto para editar.</p>
        );

      case "Eliminar":
        return idSeleccionado !== null ? (
          <p>Marca de producto con ID {idSeleccionado} eliminado (baja).</p>
        ) : (
          <p>Seleccioná una marca de producto para eliminar.</p>
        );

      case "Buscar":
        return <DepositoDetalle idDeposito={Number(idBuscar)} />;

      default:
        return <p>Acción no reconocida.</p>;
    }
  }

  
  }; // CIERRE DE renderComponente


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

      
        {accionSeleccionada === "Buscar" && (
            <div className="search-container">
            <input
              type="number"
              min="1" 
              placeholder="ID del tipo de producto"
              value={idBuscar}
              onChange={(e) => setIdBuscar(e.target.value)}
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
