import { useContext, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import axios from "axios";
interface AuthContextType {
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
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const loginAction = async (credentials: {
    username: string;
    password: string;
  }): Promise<void> => {
    const apiLink: string = `${backendUrl}/public/user/login`;
    try {
      await axios.post(apiLink, credentials);
      localStorage.setItem("username", credentials.username);
      showAlert("Log in successful", "success");
      navigate("/");
    } catch (error: any) {
      showAlert(error.response.data.error, "error");
    }
  };

  const signUp = async (credentials: {
    username: string;
    password: string;
  }): Promise<void> => {
    const apiLink: string = `${backendUrl}/public/user/createUser`;
    try {
      await axios.post(apiLink, credentials);
      localStorage.setItem("username", credentials.username);
      showAlert("Log in successful", "success");
      navigate("/");
    } catch (error: any) {
      showAlert(error.response.data.error, "error");
    }
  };

  const logOut = async (): Promise<void> => {
    //remove cookie
    try {
      const apiLink: string = `${backendUrl}/public/user/logout`;
      await axios.post(apiLink);
      localStorage.removeItem("username");
    } catch (error: any) {
      alert(error.messsage);
    }

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ loginAction, logOut, signUp }}>
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
