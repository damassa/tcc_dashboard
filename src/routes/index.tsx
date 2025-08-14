import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";
import AddCategoryPage from "../pages/AddCategoryPage";
import AddSeriePage from "../pages/AddSeriePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />

      <Route
        path="/addSerie"
        element={<PrivateRoute element={<AddSeriePage />} />}
      />

      <Route
        path="/addCategory"
        element={<PrivateRoute element={<AddCategoryPage />} />}
      />

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
