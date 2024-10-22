'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react'
import { IoMdCheckmark } from 'react-icons/io'
import AdminProtected from '../hooks/adminProtected';

import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';
import DashboardHeader from '../components/Admin/DashboardHeader';
import DashboardHero from '../components/Admin/DashboardHero';

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
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%]">
                        <DashboardHeader open={open} setOpen={setOpen}/>
                        <DashboardHero isDashboard={true} />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page