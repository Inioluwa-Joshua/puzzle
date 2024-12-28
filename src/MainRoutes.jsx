import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";

const MainRoutes = () => (
  <Routes>
    <Route path="/:id" element={<App />} />
    {/* Add other routes here */}
  </Routes>
);

export default MainRoutes;
