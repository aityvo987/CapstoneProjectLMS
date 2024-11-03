'use client'
import CourseDetailPage from '@/app/components/Course/CourseDetailPage';
import React from 'react'



const page = ({params}:any) => {
    return (
        <div>
            <CourseDetailPage id={params.id}/>
        </div>
    )
}
export default page