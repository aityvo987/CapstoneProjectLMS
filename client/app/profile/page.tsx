'use client'

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import  Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const page: FC<Props> = () => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  const {data,isLoading,refetch} = useLoadUserQuery(undefined,{})
  const user = data.user;
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
