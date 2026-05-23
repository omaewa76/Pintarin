import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";

import "./index.css";
import "leaflet/dist/leaflet.css";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,

            style: {
              borderRadius: "18px",
              background: "#0f172a",
              color: "#fff",
              fontWeight: 600,
              padding: "16px",
            },

            success: {
              style: {
                background: "#065f46",
              },
            },

            error: {
              style: {
                background: "#991b1b",
              },
            },
          }}
        />
      </>
    </AuthProvider>
  </StrictMode>,
);
