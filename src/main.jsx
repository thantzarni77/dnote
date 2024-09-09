import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import NoteContextProvider from "./context/NoteContext.jsx";
import UserContextProvider from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NoteContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NoteContextProvider>
  </StrictMode>,
);
