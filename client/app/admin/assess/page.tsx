'use client'
import React, { useState } from 'react'
import Heading from '@/app/utils/Heading'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import AdminProtected from '@/app/hooks/adminProtected'
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import CourseQuizzes from '@/app/components/Admin/Course/Quizzes/CourseQuizzes'
type Props = {}

const page = ({params}:any) => {
    const [open, setOpen] = useState(false);
    const id= params?.id;
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
                        <DashboardHeader open={open} setOpen={setOpen}/>
                        <CourseQuizzes
                        id={id}
                        />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page