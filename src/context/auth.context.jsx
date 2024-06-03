import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggenIn, setIsLoggenIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const user = response.data;

          setIsLoggenIn(true);
          setIsLoading(false);
          setUser(user);

          if (user.role === "admin") {
            navigate("/admin");
          } else if (user.role === "user") {
            navigate("/profile");
          }
        })
        .catch((error) => {
          if (error) {
            setAuthError(error.response.data.message);
            return;
          }
          setIsLoggenIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggenIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggenIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthProviderWrapper, AuthContext };
