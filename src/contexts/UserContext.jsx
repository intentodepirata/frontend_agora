import { useContext, useState, createContext } from "react";

export const UserContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(sessionStorage.getItem("user")) ?? null
  );

  function logout() {
    setUser(null);
    sessionStorage.removeItem("user");
  }
  function login(usuario) {
    setUser(usuario);

    sessionStorage.setItem("user", JSON.stringify(usuario));
  }

  const value = {
    user,
    login,
    logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
