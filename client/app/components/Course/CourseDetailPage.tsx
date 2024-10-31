'use client'
import { useGetUserCourseDetailQuery } from '@/redux/features/courses/coursesApi';
import React, { FC, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Footer';
import CourseDetail from './CourseDetail';

type Props = {
    id: string;
}

const CourseDetailPage = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const { data, isLoading } = useGetUserCourseDetailQuery({ id });
    console.log(data)
    return (
        <>

            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div>
                        <Heading
                            title={data.course.name + " ELearning"}
                            description={
                                "ELearning is a programming community which is developed by shahriar sajeeb for helping programmers"
                            }
                            keywords={data?.course?.tags}></Heading>
                        <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                        />
                        <CourseDetail data={data.course}/>
                            

                        <Footer/>
                    </div>
                )
            }


        </>
    )
}
export default CourseDetailPage