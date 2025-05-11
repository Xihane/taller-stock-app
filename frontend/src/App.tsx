import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Ingresos from "./pages/Ingresos";
import Egresos from "./pages/Egresos";
import Stock from "./pages/Stock";
import Reportes from "./pages/Reportes";
import Admin from "./pages/Admin";
import './App.css'; // ⬅️ Acá va tu CSS personalizado

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/ingresos" element={<Ingresos />} />
        <Route path="/egresos" element={<Egresos  />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/stock" element={<Stock />} /> 
        <Route path="/" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
