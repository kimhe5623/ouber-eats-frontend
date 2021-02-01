import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import ouberLogo from "../images/eats-logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && 
        <div className="bg-red-500 p-3 text-white text-center text-sm">
          <span>Please verify your email</span>
        </div>
      }
      <header className="py-8">
        <div className="w-full px-5 2xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <img src={ouberLogo} className="w-24" alt="Ouber Eats" />
          <Link to="/edit-profile">
            <span className="text-xs"><FontAwesomeIcon icon={faUser} className="text-xl" /></span>
          </Link>
        </div>
      </header>
    </>
  );
};