'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import AllUsers from '@/app/components/Admin/Users/AllUsers';
import Heading from '@/app/utils/Heading';
import React, { FC } from 'react'
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
                        <AllUsers isTeam={true} />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page