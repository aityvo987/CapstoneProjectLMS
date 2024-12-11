'use client'

import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import FAQ from "../components/Route/FAQ";

type Props = {};

const page: FC<Props> = () => {

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login");
  return (
    <div>
      
        <Heading
          title="FAQ - Elearning"
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
        <FAQ/>
        <Footer/>
     
    </div>
  );
};

export default page;
