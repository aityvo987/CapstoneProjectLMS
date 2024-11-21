'use client'

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import  Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../components/Loader/Loader";

type Props = {};

const page: FC<Props> = () => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  const {data,isLoading,refetch} = useLoadUserQuery(undefined,{})
  const user = data?.user;

  if (isLoading) {
    return <Loader></Loader>; // Display a loading state while fetching data
  }

  if (!user) {
    return (
      <div>
        <p>User not found or not logged in.</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    ); // Handle undefined user gracefully
  }
  return (
    <div>
      <Protected>
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
        <Profile user={user}></Profile>
        <Footer/>
      </Protected>
    </div>
  );
};

export default page;
