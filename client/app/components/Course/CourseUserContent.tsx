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

const CourseUserContent = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const { data, isLoading } = useGetUserCourseDetailQuery({ id });
    console.log(data)
    return (
        <>
        </>
    )
}
export default CourseUserContent