"use client";

import {
  useGetAllCoursesQuery,
  useGetAllUsersCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/styles";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";
import { BiSearch } from "react-icons/bi";
import { CompressOutlined } from "@mui/icons-material";
// import { number } from "yup";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const courseSelected = searchParams?.get("title");
  const { data, isLoading } = useGetAllUsersCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  useEffect(() => {
    //Hiển thị tất cả khóa học
    if (category === "All") {
      setCourses(data?.courses);
      console.log("Courses", data);
      console.log("Category", categoriesData);
    }

    console.log(category);
    //Hiển thi khóa học theo danh mục khóa học
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.category === category)
      );
    }

    //Hiển thị khóa học theo kết quả tìm kiếm
    if (courseSelected) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(courseSelected.toLowerCase())
        )
      );
    }
  }, [data, category, courseSelected]);

  const categories = categoriesData?.layout.categories;
  // console.log(categories);

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
                onClick={() => {
                  setCategory("All");
                  router.push("/courses"); // Redirect to /courses when 'All' is clicked
                }}
              >
                All
              </div>
              {/* Courses by category */}
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item._id ? "bg-[crimson]" : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                      onClick={() => setCategory(item._id)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              {/* Search course */}
              <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                <input
                  type="search"
                  placeholder="Search Courses...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#fffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000] dark:text-[#fff] font-[500] font-Josefin"
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={30} />
                </div>
              </div>
            </div>
            {/* Course not found */}
            {courses && courses.length === 0 && (
              <p
                className={`${styles.label} flex items-center justify-center min-h-[50vh]`}
              >
                {courseSelected
                  ? "No courses found!"
                  : "No courses found  in this category. Please try another one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
};

export default page;
