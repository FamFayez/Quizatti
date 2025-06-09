import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useProvider = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  );
  const [token, setToken] = useState(
    sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null
  );
  const [userType, setUserType] = useState(
    sessionStorage.getItem("userType")
      ? sessionStorage.getItem("userType")
      : null
  );

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    setToken(null);
    setUserType(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userType,
        setUserType,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
