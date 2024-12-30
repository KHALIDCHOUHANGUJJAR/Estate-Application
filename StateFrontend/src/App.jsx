import { Route, Routes } from "react-router-dom";
import { My_routes } from "./Routes/Routes";
import Header from "./Components/Header";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <>
    <Toaster />
      <Header />
      <Routes>
        {My_routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}
