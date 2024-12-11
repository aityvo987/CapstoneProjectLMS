'use client'
import { title } from 'process'
import React, { FC, useEffect, useState } from 'react'
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
                category:editCourseData.category,
                price: editCourseData.price,
                lecturer:editCourseData.lecturer,
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
        category: "",
        price: "",
        lecturer: "",
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
            videoLength: "",
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
                        "",
                    ],
                    correctOptionIndex: 0,
                },
                ],
            },

        },
    ]);
    
    
    const handleCourseEdit = async (e: any) => {
        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoLength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            quizzes:{
                essayQuizzes:courseContent.quizzes.essayQuizzes.map((essayQuiz) => ({
                    question:essayQuiz.question
                })),
                multipleChoiceQuizzes:courseContent.quizzes.multipleChoiceQuizzes.map((multipleChoiceQuiz) => ({
                    question:multipleChoiceQuiz.question,
                    options:multipleChoiceQuiz.options,
                    correctOptionIndex:multipleChoiceQuiz.correctOptionIndex,
                })),
            },
            suggestion: courseContent.suggestion,

        }));
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            category: courseInfo.category,
            lecturer: courseInfo.lecturer,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            courseData: formattedCourseContentData,
        };
        console.log("CourseData1", data);
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