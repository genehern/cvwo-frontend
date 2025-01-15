import { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../utils/AuthContext";
import Navbar from "../components/Navbar";
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
            label: "Username", // Change label to "Username"
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value), // Set username input
          },
          submitButton: {
            children: "Sign Up",
          },
          passwordField: {
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value), // Set password input
          },
          rememberMe: {
            control: <></>,
            label: "",
          },
        }}
      />
    </AppProvider>
  );
}
