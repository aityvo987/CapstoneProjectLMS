'use client'
import OrdersAnalytics from '@/app/components/Admin/Analytics/OrdersAnalytics';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import Redirect from '@/app/components/Admin/Redirect/Redirect';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';

import Heading from '@/app/utils/Heading';
import React, { FC, useState } from 'react'
type Props = {
}

const page = (props: Props) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div>
                <Heading
                    title="ELearning - Redirect"
                    description="ELearning is a platform for students to learn get help from lecturers"
                    keywords="Progamming,MERN,Machine Learning" />
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%] h-fit">
                        <DashboardHeader open={open} setOpen={setOpen}/>
                        <Redirect />
                    </div>
                </div>
        </div>
    )
}
export default page