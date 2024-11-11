"use client";

import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/styles";
import CourseCard from "../components/Course/CourseCard";
// import { number } from "yup";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    //Hiển thị tất cả khóa học
    if (category === "All") {
      setCourses(data?.courses);
    }

    //Hiển thi khóa học theo danh mục khóa học
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.category === category)
      );
    }

    //Hiển thị khóa học theo kết quả tìm kiếm
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          ></Header>
          <div className="m-auto w-[95%] 800px:w-[85%] min-h-[70vh]">
            <Heading
              title="All courses - Elearning"
              description="ELearning is a platform for students to learn get help from lecturers"
              keywords="Progamming,MERN,Machine Learning"
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              {/* All courses */}
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {/* Courses by category */}
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {/* Course not found */}
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} flex items-center justify-center min-h-[50vh]`}
              >
                {search
                  ? "No courses found!"
                  : "No courses found  in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                {
                    courses &&
                    courses.map((item:any, index:number)=>(
                        <CourseCard item={item} key={index}/>
                    ))
                }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
