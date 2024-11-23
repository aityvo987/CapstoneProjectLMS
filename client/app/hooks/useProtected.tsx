import { redirect } from "next/navigation";
import React from "react";
import userAuth from "./userAuth";

interface ProtectedProps {
  user:any
  children: React.ReactNode; 
}
export default function Protected({ children,user }:ProtectedProps) {
  if(user){
    const isAuthenticated = userAuth();

    //If user not authenticated system will directs to homepage
    return isAuthenticated ? children : redirect("/");
  }
  else{
    return redirect("/");
  }
}
