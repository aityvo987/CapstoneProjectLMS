'use client'
import React from 'react'
import Heading from '@/app/utils/Heading'
import EditCourse from '@/app/components/Admin/Course/EditCourse'
type Props = {}

const page = ({params}:any) => {
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
                        {/* <AdminSideBar/> */}
                    </div>
                    <div className="w-[85%]">
                        {/* <Dashboardheader/> */}
                        <EditCourse 
                        id={id}
                        />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}
export default page