'use client'
import React from 'react'
import Heading from '@/app/utils/Heading'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
            title="ELearning - admin"
            description="ELearning is a platform for students to learn get help from lecturers"
            keywords="Progamming,MERN,Machine Learning" />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    {/* <AdminSideBar/> */}
                </div>
                <div className="w-[85%]">
                    {/* <Dashboardheader/> */}
                    <CreateCourse/>
                </div>
            </div>
        </div>
    )
}
export default page