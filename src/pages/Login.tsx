import { useState, ChangeEvent } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme, Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useAlert } from "../utils/AlertContext";
import Navbar from "../components/Navbar";

interface Provider {
  id: string;
  name: string;
}

const providers: Provider[] = [{ id: "credentials", name: "Credentials" }];

export default function Login() {
  const theme: Theme = useTheme();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loginAction } = useAuth();
  const { showAlert } = useAlert();
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Navbar />
      <AppProvider theme={theme}>
        <SignInPage
          signIn={() => {
            loginAction({ username, password });
            showAlert("Log in Successful", "success");
          }}
          providers={providers}
          slotProps={{
            emailField: {
              type: "text",
              label: "Username",
              placeholder: "Username",
              onChange: handleUsernameChange,
            },
            passwordField: {
              onChange: handlePasswordChange,
              placeholder: "********",
            },
            rememberMe: {
              control: (
                <span>
                  No account?{" "}
                  <Link
                    to="/signup"
                    style={{ color: "#1976d2", textDecoration: "none" }}
                  >
                    Sign up here
                  </Link>
                </span>
              ),
              label: "",
            },
          }}
        />
      </AppProvider>
    </>
  );
}
