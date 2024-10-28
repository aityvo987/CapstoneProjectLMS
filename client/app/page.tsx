"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero"; // Import the new HeroSection
import Courses from "./components/Route/Courses";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="ELearning"
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
      <Hero /> {/* Add the HeroSection */}
      <Courses/>
    </div>
  );
};

export default Page;
