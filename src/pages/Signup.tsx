import { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../utils/AuthContext";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
interface Provider {
  id: string;
  name: string;
}

const providers: Provider[] = [{ id: "credentials", name: "Credentials" }];

export default function Signup() {
  const theme = useTheme();
  const { signUp } = useAuth();
  // Capture user input using React state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AppProvider theme={theme}>
      <Navbar />
      <SignInPage
        // @ts-ignore
        signIn={() => signUp({ username, password })}
        providers={providers}
        slots={{
          title: () => {
            return <h2 style={{ marginBottom: 8 }}>Sign Up</h2>;
          },
          subtitle: () => {
            return <></>;
          },
        }}
        slotProps={{
          emailField: {
            type: "text",
            label: "Username",
            placeholder: "Username",
            onFocus: () => {
              "lol";
            },
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value), // Set username input
          },
          submitButton: {
            // @ts-ignore
            component: (props: any) => <button {...props}>Sign Up</button>,
          },
          passwordField: {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value), // Set password input
            placeholder: "********",
          },
          rememberMe: {
            control: (
              <span>
                Have an account?{" "}
                <Link
                  to="/login"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Login here
                </Link>
              </span>
            ),
            label: "",
          },
        }}
      />
    </AppProvider>
  );
}
