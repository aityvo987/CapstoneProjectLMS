import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}
export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  console.log("useradminprotectd", user);
  if (user) {
    const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
    console.log("useradminprotectedaefwaf", user);
    if (userData) {
      const isRoleAllowed = userData.user.role === "admin" || userData.user.role === "lecturer";

      if (isRoleAllowed) {
        return children;
      } else {
        return redirect("/");
      }
    }
  }
  else {
    console.log("Missing User", user);
    return redirect("/");
  }
}