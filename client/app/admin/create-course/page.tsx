'use client'
import React from 'react'
import Heading from '@/app/utils/Heading'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import AdminProtected from '@/app/hooks/adminProtected'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="ELearning - admin"
                    description="ELearning is a platform for students to learn get help from lecturers"
                    keywords="Progamming,MERN,Machine Learning" />
                <div className="flex">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <DashboardHeader/>
                        <CreateCourse />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page