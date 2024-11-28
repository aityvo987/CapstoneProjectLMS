import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetAllUsersCoursesQuery } from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";

type Props = {
  user: any;
  route:any;
  setRoute:any;
};

const Profile: FC<Props> = ({ user,route,setRoute }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetAllUsersCoursesQuery(undefined, {});
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    toast.success("Logout successfully!");
    signOut();
    await setLogout(true);

    // redirect("/"); 
    // ==> Automatically redirect to homepage thank to Protected component
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }


  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) => data.courses.find((courses: any) => courses._id === userCourse._id))
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);

    }

  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] bg-slate-200 dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] border-[#fffffff16] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky  ${scroll ? "top-[120px]" : "top-[30px]"
          }
          `}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        ></SideBarProfile>
      </div>
      {/* Update Profile */}

      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-8">
          <ProfileInfo user={user} avatar={avatar}></ProfileInfo>
        </div>
      )}
      {/* Update password */}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-8">
          <ChangePassword></ChangePassword>
        </div>
      )}
      {/* Enrolled Course*/}
      {active === 3 && (
        <div className="w-full pt-5 pl-7 px-2 800px:px-10 800px:pl-8">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins">
              You don't have any purchased courses!
            </h1>
          )}
        </div>


      )}
    </div>
    
  );
};

export default Profile;
