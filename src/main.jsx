import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import ProjectDetail from "./pages/ProjectDetail";
import Lab from "./pages/Lab";

import GameJams from "./pages/GameJams";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="game-jams" element={<GameJams />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="lab" element={<Lab />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);