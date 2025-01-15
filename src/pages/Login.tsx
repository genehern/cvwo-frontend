import { useState, ChangeEvent } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme, Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import Navbar from "../components/Navbar";

// 1️⃣ Define provider type
interface Provider {
  id: string;
  name: string;
}

const providers: Provider[] = [{ id: "credentials", name: "Credentials" }];

export default function Login() {
  const theme: Theme = useTheme();

  // 2️⃣ Add types to state
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 3️⃣ Type the loginAction function
  const { loginAction } = useAuth();

  // 4️⃣ Type the signIn function
  const handleSignIn = () => {
    loginAction({ username, password });
  };

  // 5️⃣ Type the input event handlers
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
          signIn={handleSignIn}
          providers={providers}
          slotProps={{
            emailField: {
              type: "text",
              label: "Username",
              onChange: handleUsernameChange,
            },
            passwordField: {
              onChange: handlePasswordChange,
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
