'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import EditCategories from '@/app/components/Admin/Customization/EditCategories';
import EditHero from '@/app/components/Admin/Customization/EditHero';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import AllUsers from '@/app/components/Admin/Users/AllUsers';
import AdminProtected from '@/app/hooks/adminProtected';
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
                <div className="flex h-fit">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <DashboardHeader/>
                        <EditCategories />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page