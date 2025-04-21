import React from "react";
import { useSelector } from "react-redux";
import restrictionPic from '../src/assets/restriction.png'

const ProtectedRoute = ({ children }) => {
  const loggedInUser = useSelector((store) => store.user.value);
  console.log(loggedInUser);

  return !loggedInUser ? (
    <div className="w-full pt-24 h-screen flex items-center justify-center flex-col gap-6">
      <h1 className="text-4xl font-semibold">Please Login or Please try again later</h1>
      <img className="w-3xs" src={restrictionPic} />
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
