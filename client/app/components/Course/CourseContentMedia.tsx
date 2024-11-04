import React, { FC, useEffect, useState } from "react";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";
import Image from "next/image";
import Ratings from "@/app/utils/Rating";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineUnorderedList } from "react-icons/ai";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { styles } from "@/app/styles/styles";

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia: FC<Props> = ({ data, id, activeVideo, setActiveVideo }) => {
    return (
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />
            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={`${styles.button} !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>

                <div
                    className={`${styles.button} !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(
                            data && data.length - 1 === activeVideo
                                ? activeVideo
                                : activeVideo + 1
                        )
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>

            </div>
        </div>
    );
};

export default CourseContentMedia;
