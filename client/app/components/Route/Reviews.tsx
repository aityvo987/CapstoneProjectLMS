"use client";

import React, { FC, useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Admin/Course/Front/CourseCard";
import Image from "next/image";

type Props = {};


export const reviews = [
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "PHP Development | Dat",
        comment: "Good course, need some improvements about visuallize though",
    },
    {
        name: "Chevreuse",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Machine Learning | Dat",
        comment: "This course need to update its technologies",
    },
    {
        name: "Charlotte",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Web Security | Dat",
        comment: "I love this course, it helps me protect my website",
    },
];


const Reviews: FC<Props> = () => {
    const { data, isLoading } = useGetAllCoursesQuery({}, {
        refetchOnMountOrArgChange: true,
    });
    const [courses, setCourses] = useState<any[]>([]);


    useEffect(() => {
        setCourses(data?.courses);
    }, [data]);
    return (
        <div className="w-[90%] 800px:w-[85%] m-auto">
            <div className="w-full 800px:flex items-center">
                <div className="800px:w-[50%] w-full">
                    <Image
                        src="https://res.cloudinary.com/dkpcwsg6z/image/upload/v1729653998/awwh5a8iax0tgtl19oz5.png"
                        alt="business"
                        width={700}
                        height={700}
                    />
                </div>
            </div>
        </div>
    );
};

export default Reviews;
