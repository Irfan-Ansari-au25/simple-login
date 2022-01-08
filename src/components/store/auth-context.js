import React from "react";
import { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogIn: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        onLogIn: loginHandler,
        onLogout: logoutHandler,
        isLoggedIn: isLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
