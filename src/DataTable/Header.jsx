import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <nav className="headercss" >
      <div className="container">
        <div className="navbar-brand fw-bold" style={{color: 'rgb(255, 255, 255)'}}>
           CFRM Hackathon
        </div>
      </div>
    </nav>
  );
};

export default Header;
