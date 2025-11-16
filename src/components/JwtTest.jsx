import React, { useState, useEffect, useContext } from "react";
import Logo from "./Logo";
import LightModeButton from "./LightModeButton";
import { ThemeContext } from "../Context/ThemeContext";
import { ALT_JWT_TEST_URL, LOGOUT_URL } from "../Urls";
// import { useNavigate } from "react-router-dom";

const JwtTest = () => {
  const [data, setData] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const testJwt = async () => {
      try {
        const response = await fetch(ALT_JWT_TEST_URL, {
          method: "POST",
          credentials: "include", // Important: This sends cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("JWT Test Response:", data);
        setData(data);
      } catch (error) {
        console.error("Error testing JWT:", error);
      }
    };

    testJwt();
  }, []); // Empty dependency array means this runs once on component mount

  // const naigate = useNavigate();

  const handleLogout = () => {
    const request = async () => {
      const response = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include", // Important: This sends cookies with the request
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      console.log("Logout Response:", data);
      // naigate("/");
    };
    request();
  };
  return (
    <>
      <div className="relative min-h-screen bg-wih-900 text-wih-50 flex items-center justify-center">
        <Logo />
        <LightModeButton toggleTheme={toggleTheme} theme={theme} />
        <button
          className="absolute top-4 right-4 px-3 py-2 rounded bg-wih-700 text-wih-50 text-sm"
          onClick={handleLogout}
        >
          logout
        </button>

        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-10">
          <section className="self-center">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Welcome to WorkInHarmony
            </h1>
            <img
              src={data?.code}
              alt="Profile Picture"
              class="w-20 h-20 m-4 rounded-full object-cover border-4 border-gray-300 shadow-md"
            />
            <p className="mt-4 leading-7 text-wih-50/80 max-w-prose">
              This is Home page. Welcome back {data?.message}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default JwtTest;
