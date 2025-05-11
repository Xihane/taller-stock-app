import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Home from "./pages/Home";
import Ingresos from "./pages/Ingresos";
//import Egresos from "./pages/Egresos";
//import Stock from "./pages/Stock";
//import Reportes from "./pages/Reportes";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/ingresos" element={<Ingresos />} />

      </Routes>
    </Router>
  );
}

export default App;
