
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Rugas ORM Demo</h1>
        <p className="text-muted-foreground">Streamlined order management</p>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-muted-foreground">
        <p>
          Don't have an account?{" "}
          <Button variant="link" asChild className="p-0">
            <Link to="/register">Register here</Link>
          </Button>
        </p>
        <p className="mt-4 text-sm">
          Rugas ORM Demo Application
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
