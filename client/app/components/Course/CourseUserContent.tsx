'use client'
import { useGetUserCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetail from './CourseDetail';
import CourseContentMedia from './CourseContentMedia';

type Props = {
    id: string;
}

const CourseUserContent = ({ id }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [route, setRoute] = useState("Login");
    const { data, isLoading } = useGetUserCourseContentQuery({ id });
    const content = data.content;
    console.log(data)
    return (
        <>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <div className="w-full grid 800px:grid-cols-10">
                    <Heading
                        title={content[activeVideo]?.title}
                        description='courseContent'
                        keywords={content[activeVideo]?.tags}
                    >
                    </Heading>
                    <div className="col-span-7">
                        <CourseContentMedia
                        data={content}
                        id={id}
                        activeVideo={activeVideo}
                        setActiveVideo={setActiveVideo}
                        ></CourseContentMedia>
                    </div>
                </div>
            )}
        </>
    )
}
export default CourseUserContent