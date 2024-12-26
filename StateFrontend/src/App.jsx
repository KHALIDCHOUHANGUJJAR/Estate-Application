import { Route, Routes } from "react-router-dom";
import { My_routes } from "./Routes/Routes";
export default function App() {
  return (
    <Routes>
      {My_routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}
