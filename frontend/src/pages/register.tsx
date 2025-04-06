
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Rugas ORM Demo</h1>
        <p className="text-muted-foreground">Create your account</p>
      </div>
      
      <RegisterForm />
      
      <div className="mt-8 text-center text-muted-foreground">
        <p>
          Already have an account?{" "}
          <Button variant="link" asChild className="p-0">
            <Link to="/login">Login here</Link>
          </Button>
        </p>
        <p className="mt-4 text-sm">
          Rugas ORM Demo Application
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
