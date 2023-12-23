import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInButton from "./SigninButton";

const page = async () => {
  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="border p-8 flex items-center justify-center space-x-8 shadow-md bg-white">
        <div className="mr-8 pr-8 border-r border-gray-300">
          <img
            src="https://cdn0.iconfinder.com/data/icons/popular-social-media-colored/48/JD-14-512.png"
            alt="twitter in a phone"
            className="md:inline-flex object-cover md:w-44 rotate-6 h-80"
          />
        </div>
        <div>
          {Object.values(providers).map((provider) => (
            <div key={provider.id} className="">
              <SignInButton key={provider.id} provider={provider} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
