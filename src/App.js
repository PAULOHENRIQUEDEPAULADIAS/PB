import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/moviecontext.js";

import Home from "./home/App.js";
import Details from "./details/index.js";

export default function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </Router>
      </MovieProvider>
    </div>
  );
}
