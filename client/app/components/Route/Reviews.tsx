"use client";

import React, { FC, useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Admin/Course/Front/CourseCard";
import Image from "next/image";
import { styles } from "@/app/styles/styles";
import ReviewCard from "../Admin/Course/Front/ReviewCard";

type Props = {};


export const reviews = [
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "PHP Development | Dat",
        comment: "Good course, need some improvements about visuallize though.Good course, need some improvements about visuallize though.Good course, need some improvements about visuallize though.Good course, need some improvements about visuallize though.Good course, need some improvements about visuallize though.Good course, need some improvements about visuallize though.",
        ratings:5,
    },
    {
        name: "Chevreuse",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Machine Learning | Dat",
        comment: "This course need to update its technologies",
        ratings:3,
    },
    {
        name: "Charlotte",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Web Security | Dat",
        comment: "I love this course, it helps me protect my website",
        ratings:4,
    },
    {
        name: "Furina",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Web Security | Dat",
        comment: "I hate this course, it makes me realise how weak is my website",
        ratings:4.5,
    },
];


const Reviews: FC<Props> = () => {
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src="https://res.cloudinary.com/dkpcwsg6z/image/upload/v1729653998/awwh5a8iax0tgtl19oz5.png"
                        alt="business"
                        width={300}
                        height={300}
                    />
                </div>
                <div className="800px:w-[50%] w-full">
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className="text-gradient">Our Strength</span>{" "}
                        <br /> See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Hehehehehehehehehehehehehehehehehehehe
                    </p>
                </div>
                <br></br>
                <br></br>

            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-6 mb-12 ">
                {reviews &&
                    reviews.map((i, index) => 
                    <div className="mt-4 md:mt-0 xl:mt-3">
                        <ReviewCard item={i} key={index} />
                    </div>
                    )}
            </div>
        </div>
    );
};

export default Reviews;
