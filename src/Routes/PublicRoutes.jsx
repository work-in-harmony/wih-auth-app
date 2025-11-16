import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../page/DashboardPage";
import JwtTest from "../components/JwtTest";
import { JWT_TEST_URL } from "../Urls";

const PublicRoutes = ({ children }) => {
  const [data, setData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const testJwt = async () => {
      try {
        const response = await fetch(JWT_TEST_URL, {
          method: "POST",
          credentials: "include", // Important: This sends cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.message === "Unauthorized") {
          throw new Error("Unauthorized");
        }
        console.log("JWT Test Response:", data);
        setData(data)
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error testing JWT:", error);
        setIsAuthenticated(false);
      }
    };

    testJwt();
  }, []);

  return !isAuthenticated ? children : <JwtTest />;
};

export default PublicRoutes;
