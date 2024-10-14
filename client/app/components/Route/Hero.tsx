"use client";

import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";
import hero_banner from "../../../../public/assets/hero_banner.png";
import avatar from "../../../../public/assets/avatar.png";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full 1000px:flex gap-4 items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[60px] w-[60px] hero_animation rounded-full "></div>
      <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
        <Image
          src={hero_banner}
          alt="Banner Image"
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
        />
      </div>

      <div className="1000px:w-[60%] flex flex-col place-items-center 1000px:mt-[0px] text-center 1000px:text-center mt-[150px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px]">
          Improve Your Online Learning Experience Better Instantly
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:!w-[78%]">
          We have 40k+ Online courses & 500k+ Online registered students. Find
          your desired courses from them.
        </p>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input
            type="search"
            placeholder="Search Courses...."
            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#fffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000] dark:text-[#fff] font-[500] font-Josefin"
          />
          <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={avatar}
            alt="Image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <Image
            src={avatar}
            width={50}
            height={50}
            alt="Image"
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={avatar}
            alt="Image"
            width={50}
            height={50}
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People Trust me Bro.{" "}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>{""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
