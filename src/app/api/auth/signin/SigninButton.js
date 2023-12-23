"use client";
import { getProviders, signIn } from "next-auth/react";
import LoginForm from "@/components/LoginForm";

const SignInButton = ({ provider }) => {
  return (
    <>
      {provider.name === "Credentials" ? (
        <LoginForm />
      ) : (
        <div className="flex flex-col items-center space-x-4">
          <img
            className="w-36 object-cover"
            src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            alt="twitter logo"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              signIn(provider.id, { callbackUrl: "/" });
            }}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with {provider.id}
          </button>
        </div>
      )}
    </>
  );
};

export default SignInButton;
