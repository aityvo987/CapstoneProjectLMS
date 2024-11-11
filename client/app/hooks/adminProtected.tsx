import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}
export default function AdminProtected({ children }: ProtectedProps) {
  // const { user } = useSelector((state: any) => state.auth);
  const {data:userData,isLoading,refetch} = useLoadUserQuery(undefined,{})

  if (userData) {
    const isAdmin = userData?.user.role === "admin";
    return isAdmin ? children : redirect("/");
  }
}
