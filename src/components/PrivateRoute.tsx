import { Navigate } from "react-router-dom";

const isAuth = (): string | null => {
  return localStorage.getItem("jwt");
};
const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  return isAuth() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
