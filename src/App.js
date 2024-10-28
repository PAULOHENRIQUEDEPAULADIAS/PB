import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./home/App.js";
import Nav from "./navbar/index.js";
import Details from "./details/index.js";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}
