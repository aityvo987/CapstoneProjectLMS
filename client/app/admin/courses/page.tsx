'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import Heading from '@/app/utils/Heading';
import React, { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
type Props = {
}

const page = (props: Props) => {

    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - admin"
                    description="ELearning is a platform for students to learn get help from lecturers"
                    keywords="Progamming,MERN,Machine Learning" />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        {/* <AdminSideBar/> */}
                    </div>
                    <div className="w-[85%]">
                        {/* <Dashboardheader/> */}
                        <AllCourses />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page