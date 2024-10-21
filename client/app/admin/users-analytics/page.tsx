'use client'
import CoursesAnalytics from '@/app/components/Admin/Analytics/CoursesAnalytics';
import UsersAnalytics from '@/app/components/Admin/Analytics/UsersAnalytics';
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import EditFAQ from '@/app/components/Admin/Customization/EditFAQ';
import EditHero from '@/app/components/Admin/Customization/EditHero';
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
                        <UsersAnalytics />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page