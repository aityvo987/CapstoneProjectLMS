'use client'

import React, { FC, useEffect, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import  Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";
import { redirect } from "next/navigation";

type Props = {};

const page: FC<Props> = () => {

  const [open, setOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  const {data,isLoading,refetch} = useLoadUserQuery(undefined,{})
  const user = data?.user;

  useEffect(() => {
    if (!isLoading && !user) {
      // Nếu không có user, chuyển hướng về dashboard
      redirect("/");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loader></Loader>; // Display a loading state while fetching data
  }

  
  return (
    <div>
      <Protected user={user}>
        <Heading
          title={`${user?.name} profile`}
          description="ELearning is a platform for students to learn get help from lecturers"
          keywords="Progamming,MERN,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} route={route} setRoute={setRoute}></Profile>
        <Footer/>
      </Protected>
    </div>
  );
};

export default page;
