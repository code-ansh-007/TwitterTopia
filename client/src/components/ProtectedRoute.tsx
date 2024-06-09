import { Navigate, useLocation } from "react-router-dom";
import { ProtectedRouteProps } from "../../types";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, auth }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null;
  const location = useLocation();

  if (!isLoggedIn && auth) {
    // ? User is not logged in and the route requires authentication
    return <Navigate to="/user/signin" />;
  } else if (
    isLoggedIn &&
    ["/user/signin", "/user/signup"].includes(location.pathname)
  ) {
    // ? User is logged in and trying to access signin/signup pages
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
