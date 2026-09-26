import { useState } from "react";
import "./App.css";

import Landing from "./pages/LandingPage.jsx";
import Auth from "./pages/Auth.jsx";

function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") {
    return (
      <Landing
        onStart={() => setPage("auth")}
      />
    );
  }

  if (page === "auth") {
    return (
      <Auth
        onSuccess={() => setPage("profile")}
        onBack={() => setPage("landing")}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b14",
        color: "#fff",
        display: "grid",
        placeItems: "center",
      }}
    >
      <h1>Profile Setup Coming Next 🚀</h1>
    </div>
  );
}

export default App;