import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import Home from "../pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router;
