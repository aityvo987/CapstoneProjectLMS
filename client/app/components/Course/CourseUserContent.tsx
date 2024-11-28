'use client'
import { useGetUserCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseContentMedia from './CourseContentMedia';
import CourseContentList from './CourseContentList';

type Props = {
    id: string;
    user:any;
}

const CourseUserContent = ({ id, user }: Props) => {
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const { data, isLoading,refetch } = useGetUserCourseContentQuery({ id },{refetchOnMountOrArgChange:true});
    const content = data?.content;
    const progress = user.courses.find((course: any) => course._id.toString() === id)?.progress || 0;
    useEffect(() => {
        setActiveVideo(progress);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader></Loader>
            ) : (
                <>
                    <Header
                        activeItem={1}
                        open={open}
                        setOpen={setOpen}
                        route={route}
                        setRoute={setRoute}
                    />
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
                                user={user}
                                refetch={refetch}
                            ></CourseContentMedia>
                        </div>
                        <div className="hidden 800px:block 800px:col-span-3">
                            <CourseContentList
                                setActiveVideo={setActiveVideo}
                                data={content}
                                activeVideo={activeVideo}
                            />
                        </div>
                    </div>
                </>

            )}
        </>
    )
}
export default CourseUserContent