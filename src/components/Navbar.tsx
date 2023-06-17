import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { token } = useAuthContext();
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    console.log("token changed:", token);
    setIsAuthenticated(!!token);
  }, [token]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          SHOPEASE
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <span className="nav-link">Welcome</span>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
