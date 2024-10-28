import React, { useState, useEffect } from "react";

import style from "./style.module.css";
import Nav from "../navbar/index.js";

const privateKey = process.env.REACT_APP_PRIVATE_API_KEY;

export default function Details() {
  return (
    <div>
      <Nav />
    </div>
  );
}
