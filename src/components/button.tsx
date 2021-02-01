import React from "react";

interface IBurronProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IBurronProps> = ({canClick, loading, actionText}) => <button
  className={`text-white font-semibold py-4 transition-colors
              ${canClick ? "bg-lime-600 hover:bg-lime-700" : "bg-gray-300 pointer-events-none"}`}>
  {loading ? "Loading..." : actionText}
</button>