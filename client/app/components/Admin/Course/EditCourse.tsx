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

type Props = {
    id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
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

    }, [isLoading,isSuccess,error])

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
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
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

    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
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
    const [courseData, setCourseData] = useState({});
    const handleSubmit = async () => {
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))
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
            suggestion: courseContent.suggestion,
            quizzes: courseContent.quizzes,

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
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData,
        };
        setCourseData(data);
    };
    console.log(courseData);
    const handleCourseEdit = async (e: any) => {
        const data = courseData;
        await editCourse({id:editCourseData?._id,data});


    }

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {
                    active === 0 && (
                        <CourseInformation
                            courseInfo={courseInfo}
                            setCourseInfo={setCourseInfo}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseDataComp
                            benefits={benefits}
                            setBenefits={setBenefits}
                            prerequisites={prerequisites}
                            setPrerequisites={setPrerequisites}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            handleSubmit={handleSubmit}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            courseData={courseData}
                            handleCourseCreate={handleCourseEdit}
                            active={active}
                            setActive={setActive}
                            isEdit={true}
                        />
                    )
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}
export default EditCourse