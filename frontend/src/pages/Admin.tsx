import ProductoForm from "../components/ProductoForm";
import ProductoTable from "../components/ProductoTable";

const Admin = () => {
  return (
    <div>
      <h1>Administrar Productos</h1>
      <ProductoForm />
      <ProductoTable />
    </div>
  );
};

export default Admin;
