import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import "./index.css";
import App from "./App.jsx";

// Replace 'YOUR_GOOGLE_CLIENT_ID' with your actual Google Client ID
const GOOGLE_CLIENT_ID = "397766418015-prr178ivuc732l4qjb362g01akgndt3f.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </StrictMode>
);
