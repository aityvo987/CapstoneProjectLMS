'use client'
import OrdersAnalytics from '@/app/components/Admin/Analytics/OrdersAnalytics';
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
                <div className="flex h-screen">
                    <div className="1500px:w-[16%] w-1/5">
                        <AdminSidebar/>
                    </div>
                    <div className="w-[85%] h-fit">
                        <DashboardHeader open={open} setOpen={setOpen}/>
                        <OrdersAnalytics />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page