import { createContext, useContext, useState, useEffect } from "react";
import { userAuthenticate } from "../api/AuthenticationApiService";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(AsyncStorage.getItem("token"));
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      AsyncStorage.setItem("isAuthenticated", "true");
    } else {
      AsyncStorage.removeItem("isAuthenticated");
    }
  }, [token]);

  async function login(username, password) {
    try {
      const response = await userAuthenticate(username, password);
      if (response.data.StatusCode === 1) {
        const data = response.data;
        setToken(data.Token);
        AsyncStorage.setItem("token", data.Token);
        AsyncStorage.setItem("userId", data.UserId.toString());
        AsyncStorage.setItem("userName", data.Name);
        AsyncStorage.setItem("RefreshToken", data.RefreshToken);
        AsyncStorage.setItem("user", JSON.stringify(data.user));
        AsyncStorage.setItem("isAuthenticated", "true");
        return true;
      } else {
        setError(response.data.StatusMessage);
        logout();
        return false;
      }
    } catch (error) {
      setError(error.message);
      logout();
      return false;
    }
  }

  function logout() {
    setToken(null);
    AsyncStorage.removeItem("isAuthenticated");
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("userName");
    AsyncStorage.removeItem("RefreshToken");
    AsyncStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ login, logout, token, error }}>
      {children}
    </AuthContext.Provider>
  );
}
