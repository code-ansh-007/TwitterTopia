import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<object>({});
  const navigate = useNavigate();
  useEffect(() => {
    const userDetails = localStorage.getItem("user:details");
    if (userDetails) {
      setUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <main>
      hello
      <button className="bg-red-500" onClick={logout}>
        logout
      </button>
    </main>
  );
};

export default Layout(Profile);
