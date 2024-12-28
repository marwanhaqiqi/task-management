import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axios.post(
        `${"http://localhost:8000/api"}/login`,
        new URLSearchParams(data).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setName(response.data.data.name);
    } catch (err) {
      //   setError("Login failed. Please check your credentials.");
    }
  };

  const logout = () => {
    setToken(null);
    setName(null);
  };

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);

  //   useEffect(() => {
  //     if (token) {
  //       //   localStorage.setItem("token", JSON.stringify(user));

  //       const savedToken = localStorage.getItem("token");
  //       if (savedToken) {
  //         setToken(JSON.parse(savedToken));
  //       }
  //     } else {
  //       localStorage.removeItem("token");
  //     }
  //   }, [token]);

  //   useEffect(() => {
  //     console.log("xxxxxxxxxxxxx", token);
  //   }, [token]);

  return (
    <AuthContext.Provider value={{ name, token, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
