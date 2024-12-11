'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import ManageQuizzes from '@/app/components/Admin/Course/Quizzes/ManageQuizzes';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react'
type Props = {
}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
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
                        <DashboardHeader open={open} setOpen={setOpen}/>
                        <ManageQuizzes  />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page