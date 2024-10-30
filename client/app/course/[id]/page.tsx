'use client'
import CourseDetailPage from '@/app/components/Course/CourseDetailPage';
import React, { FC, useState } from 'react'



const page = ({params}:any) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <CourseDetailPage id={params.id}/>
        </div>
    )
}
export default page