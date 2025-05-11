import { useEffect, useState } from "react";
import api from "../services/api";

interface StockItem {
  producto: string;
  idProducto: number;
  idDeposito: number;
  stockDisponible: number;
}

const StockTable = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await api.get("/stock-funciones/disponible");
        if (response.status !== 200) {
          throw new Error("Error al obtener el stock");
        }
        setStockItems(response.data);
      } catch (err) {
        setError("Error al obtener el stock.");
      }
    };

    fetchStock();
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Stock Disponible</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>ID producto</th>
            <th>ID deposito</th>
            <th>Stock disponible</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item, index) => (
            <tr key={index}>
              <td>{item.producto}</td>
              <td>{item.idProducto}</td>
              <td>{item.idDeposito}</td>
              <td>{item.stockDisponible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;