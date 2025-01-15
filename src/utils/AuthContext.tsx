import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
interface AuthContextType {
  user: string | null;
  loginAction: (data: credentials) => Promise<void>;
  signUp: (data: credentials) => Promise<void>;
  logOut: () => void;
}

interface credentials {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginAction = async (credentials: {
    username: string;
    password: string;
  }): Promise<void> => {
    const apiLink = `${backendUrl}/public/user/login`;
    try {
      const response = await axios.post(apiLink, credentials);

      console.log("Sign-in successful:", response.data);
      navigate("/");
      setUser(credentials.username);
    } catch (error: any) {
      console.error("Error during sign-in:", error);
    }
  };

  const signUp = async (credentials: {
    username: string;
    password: string;
  }): Promise<void> => {
    const apiLink: string = `${backendUrl}/public/user/createUser`;
    try {
      await axios.post(apiLink, credentials);
      setUser(credentials.username);
      navigate("/");
    } catch (error: any) {
      console.error("Error during sign-up:", error);
    }
  };

  const logOut = (): void => {
    setUser(null);
    //remove cookie
    Cookies.remove("jwt");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
