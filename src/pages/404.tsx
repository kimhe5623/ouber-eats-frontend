import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Not Found | Ouber Eats</title>
      </Helmet>
      <h2 className="font-semibold text-2xl mb-3">Page Not Found.</h2>
      <h4 className="font-medium text-lg mb-5">The page you're lokking for does not exist or has moved.</h4>
      <Link className="font-semibold text-lime-600 hover:underline" to="/">Go back home &rarr;</Link>
    </div>
  );
};