'use client'
import { title } from 'process'
import React, { FC, useEffect, useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseDataComp from './CourseDataComp'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import toast from 'react-hot-toast'
import { redirect, useParams } from 'next/navigation'
import { useEditCourseMutation, useGetLecturerAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import CourseQuizzesComp from './CourseQuizzesComp'

type Props = {
    id: string;
};

const CourseQuizzes: FC<Props> = ({ id }) => {
    const [editCourse, { isSuccess, error }] = useEditCourseMutation({});
    const { isLoading, data, refetch } = useGetLecturerAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

    const editCourseData = data && data.courses.find((i: any) => i._id === id)
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Course edited successfully");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }

    }, [isLoading, isSuccess, error])

    const [active, setActive] = useState(0);
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatedPrice: editCourseData.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url,
            })
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });

    
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
            quizzes: {
                essayQuizzes: [
                    {
                        question: ""
                    },
                ],
                multipleChoiceQuizzes: [{
                    question: "",
                    options: [
                        {
                            title: ""
                        },
                    ],
                    correctOptionIndex: 0,
                },
                ],
            }

        },
    ]);
    const [courseData, setCourseData] = useState({});
    // const handleSubmit = async () => {
    //     const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
    //     const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))
        
    //     const formattedCourseContentData = courseContentData.map((courseContent) => ({
    //         videoUrl: courseContent.videoUrl,
    //         title: courseContent.title,
    //         description: courseContent.description,
    //         videoSection: courseContent.videoSection,
    //         links: courseContent.links.map((link) => ({
    //             title: link.title,
    //             url: link.url,
    //         })),
    //         quizzes:{
    //             essayQuizzes: courseContent.quizzes.essayQuizzes.map((eq) => ({
    //                 question: eq.question,
    //             })),
    //             multipleChoiceQuizzes: courseContent.quizzes.multipleChoiceQuizzes.map((mq) => ({
    //                 question: mq.question,
    //                 options:mq.options,
    //                 correctOptionIndex:mq.correctOptionIndex,
    //             })),
    //         },
    //         suggestion: courseContent.suggestion,

    //     }));
    //     const data = {
    //         name: courseInfo.name,
    //         description: courseInfo.description,
    //         price: courseInfo.price,
    //         estimatedPrice: courseInfo.estimatedPrice,
    //         tags: courseInfo.tags,
    //         thumbnail: courseInfo.thumbnail,
    //         level: courseInfo.level,
    //         demoUrl: courseInfo.demoUrl,
    //         totalVideos: courseContentData.length,
    //         benefits: formattedBenefits,
    //         prerequisites: formattedPrerequisites,
    //         courseContent: formattedCourseContentData,
    //     };
    //     setCourseData(data);
    // };
    console.log("Data", courseContentData);
    const handleCourseEdit = async (e: any) => {
        const data = courseData;
        await editCourse({ id: editCourseData?._id, data });
    }

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                <CourseQuizzesComp
                    courseContentData={courseContentData}
                    setCourseContentData={setCourseContentData}
                    handleSubmit={handleCourseEdit}
                    active={active}
                    setActive={setActive}
                />
            </div>
        </div>
    )
}
export default CourseQuizzes