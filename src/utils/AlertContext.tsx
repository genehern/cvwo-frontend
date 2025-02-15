import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AlertContextType {
  showAlert: (
    message: string,
    severity: "error" | "warning" | "info" | "success"
  ) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<{
    message: string;
    severity: "error" | "warning" | "info" | "success";
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const showAlert = (
    message: string,
    severity: "error" | "warning" | "info" | "success"
  ) => {
    setIsOpen(true);
    setAlert({ message, severity });
  };

  const hideAlert = () => {
    setAlert(null);
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Snackbar
          open={isOpen}
          autoHideDuration={2000}
          onClose={hideAlert}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={alert.severity} onClose={hideAlert}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </AlertContext.Provider>
  );
};
