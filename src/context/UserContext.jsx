import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storeToken = localStorage.getItem("token");
    return storeToken ? JSON.parse(storeToken) : null;
  });

  const updateToken = (JWT_TOKEN) => {
    const token = JSON.stringify(JWT_TOKEN);
    localStorage.setItem("token", token);
    setToken(JWT_TOKEN);
  };

  useEffect(() => {
    const storeToken = localStorage.getItem("token");
    if (storeToken) {
      setToken(JSON.parse(storeToken));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, updateToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
