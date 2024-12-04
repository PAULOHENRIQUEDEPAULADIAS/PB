
import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>
          © Paulo Henrique de Paula Dias. <br />
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#081f37",
    color: "#fff",
    padding: "1rem 0",
    textAlign: "center",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1rem",
  },
};

export default Footer;
