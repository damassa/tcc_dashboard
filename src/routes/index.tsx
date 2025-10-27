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
import EditCategory from "../components/EditCategory";
import EditSerie from "../components/EditSerie";
import AddEpisodePage from "../components/AddEpisode";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />

      <Route
        path="/addSerie"
        element={<PrivateRoute element={<AddSeriePage />} />}
      />

      <Route
        path="/editSerie/:id"
        element={<PrivateRoute element={<EditSerie />} />}
      />

      <Route
        path="/addEpisode"
        element={<PrivateRoute element={<AddEpisodePage />} />}
      />

      <Route
        path="/addCategory"
        element={<PrivateRoute element={<AddCategoryPage />} />}
      />

      <Route
        path="/editCategory/:id"
        element={<PrivateRoute element={<EditCategory />} />}
      />

      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
