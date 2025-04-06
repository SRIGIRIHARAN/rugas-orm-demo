import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (user) {
      // If logged in, redirect to dashboard
      navigate("/dashboard");
    } else {
      // Otherwise, redirect to login
      navigate("/login");
    }
  }, [navigate]);
  
  // This is just a loading placeholder while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Rugas ORM Demo</h1>
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
