import React from "react";

import Nav from "../navbar/index.js";
import OnTheater from "../body/ontheater.js";
import Popular from "../popular/index.js";
import TopRated from "../topRated/index.js";
import Footer from "../footer/index.js";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <OnTheater />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
}
