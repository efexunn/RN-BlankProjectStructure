import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com"; // api linki localhost:8080
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  // loadtoken fonksiyonu loading ekranı ve halihazırda bir token var mı onun kontrolü
  useEffect(() => {
    async function loadToken() {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored token " + token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    }
    loadToken();
  }, []);

  // register function
  async function register(email: string, password: string) {
    try {
      return await axios.post(`${API_URL}/users`, { email, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await axios.post(`${API_URL}/auth`, { email, password });

      console.log("~ file:AuthContext.tsx:41 ~ login ~ result:", result);
      // auth durumunu ayarlama
      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      // eğer kullanıcı giriş yaptıysa authorization header burada ayarlanıyor
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      // tokeni aynı localstorage gibi securestore da tutma
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  }

  async function logout() {
    // tokeni securestoredan silme. yani localstorageden kaldırma
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // axios authorization headerini kaldırma
    axios.defaults.headers.common["Authorization"] = "";

    // auth durumunu null hale getirme
    setAuthState({
      token: null,
      authenticated: null,
    });
  }

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
