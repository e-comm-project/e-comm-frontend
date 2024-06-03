import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin({ children }) {
  const { user } = useContext(AuthContext);

  if (user.role === "admin") {
    return children;
  } else {
    <Navigate to="/profile" />;
  }
}

export default IsAdmin;
