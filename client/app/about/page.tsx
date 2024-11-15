'use client'

import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import About from "../components/Main/About";

type Props = {};

const page: FC<Props> = () => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route,setRoute] = useState("Login");
  return (
    <div>
      
        <Heading
          title="About us - Elearning"
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
        <About/>
        <Footer/>
     
    </div>
  );
};

export default page;
