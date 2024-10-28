import React, { FC, useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";

type Props = {
    item:any;
    isProfile?:boolean;
};

const CourseCard: FC<Props> = ({item,isProfile}) => {
    return (
        <Link href={!isProfile? `/course/${item._id}`:`/course-access/${item._id}`}>
<div className="w-full min-h-[35vh] dark:bg-slate-500 dak:bg-opacity-20 backdrop-blur border dark: border-[#ffffff1d) border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">

</div>
        </Link>
    );
};

export default CourseCard;
