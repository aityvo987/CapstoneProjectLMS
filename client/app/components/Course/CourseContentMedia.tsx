import React, { FC, useEffect, useState } from "react";
import { useAddNewQuestionMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Link from "next/link";
import Image from "next/image";
import Ratings from "@/app/utils/Rating";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar, AiOutlineUnorderedList } from "react-icons/ai";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import { format } from "timeago.js";

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    setActiveVideo: (activeVideo: number) => void;
    user: any;
    refetch: any;
};

const CourseContentMedia: FC<Props> = ({ data, id, activeVideo, setActiveVideo, user, refetch }) => {
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answerId, setAnswerId] = useState('');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [addNewQuestion, { isSuccess, error, isLoading: questionCreateLoading }] = useAddNewQuestionMutation({});
    const isReviewExists = data?.reviews?.find(
        (item: any) => item.user._id === user._id
    );
    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question must not be empty!");
        } else {
            console.log("Question:", { question, courseId: id, contentId: data[activeVideo]._id })
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            refetch();
            toast.success("Write review successfully!");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error])

    const handleAnswerSubmit = () => {
        if (question.length === 0) {
            toast.error("Answer must not be empty!");
        } else {
            console.log("Question:", { question, courseId: id, contentId: data[activeVideo]._id })
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
        }
    }

    return (
        <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />
            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={`${styles.button} dark:text-white text-black !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>

                <div
                    className={`${styles.button} dark:text-white text-black !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(
                            data && data.length - 1 === activeVideo
                                ? activeVideo
                                : activeVideo + 1
                        )
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>
            </div>
            <h1 className="pt-2 text-[25px] dark:text-white text-black font-[600]">{data[activeVideo].title}</h1>
            <br></br>
            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700) rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px: text-[20px] cursor-pointer ${activeBar === index ? "text-red-500" : "dark:text-white text-black"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br></br>
            {activeBar === 0 && (
                <p className="text-[18px] dark:text-white text-black whitespace-pre-line mb-3">
                    {data[activeVideo]?.description}
                </p>
            )}

            {
                activeBar == 1 && (
                    <div>
                        {data[activeVideo]?.links.map((item: any, index: number) => (
                            <div className="mb-5">
                                <h2 className="800px:text-[20px] dark:text-white text-black 800px:inline-block">
                                    {item.title && item.title + ":"}
                                </h2>
                                <a
                                    className="inline-block text-[#4395c4]  800px:text-[20px] 800px:pl-2"
                                    href={item.url}
                                >
                                    {item.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }
            {activeBar === 2 && (
                <>
                    <div className="flex w-full">
                        <Image
                            src={user.avatar ? user.avatar.url : ""}
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <textarea
                            name=""
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            id=""
                            cols={40}
                            rows={5}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-end">

                        <div
                            className={`${styles.button
                                }!w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreateLoading && "cursor-no-drop"
                                }`}
                            onClick={questionCreateLoading ? () => { } : handleQuestion}
                        >
                            Submit
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="w-full h-[1px] bg-[#ffffff3b]">

                    </div>
                    <div>
                        <QuestionReply
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                            user={user}
                            setAnswerId={setAnswerId}
                        />
                    </div>
                </>
            )}
            {
                activeBar === 3 && (
                    <div className="w-full">
                        <>
                            {
                                !isReviewExists && (
                                    <>
                                        <div className="flex w-full">
                                            <Image
                                                src={user.avatar ? user.avatar.url : ""}
                                                width={50}
                                                height={50}
                                                alt=""
                                                className="w-[50px] h-[50px] rounded-full object-cover"
                                            />
                                            <div className="w-full">
                                                <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                                                    Give a Rating <span className="text-red-500">*</span>
                                                </h5>
                                                <div className="flex w-full ml-2 pb-3"> {[1, 2, 3, 4, 5].map((i) => rating >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />

                                                )
                                                    : (
                                                        <AiOutlineStar
                                                            key={i}
                                                            className="mr-1 cursor-pointer"
                                                            color="rgb(246,186,0)"
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    )
                                                )}
                                                </div>
                                                <textarea
                                                    name=""
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    id=""
                                                    cols={40}
                                                    rows={5}
                                                    placeholder="Write your comment..."
                                                    className="outline-none bg-transparent 800px:ml-3 border dark:border-[#ffffff57] border-[#00000080] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins dark:text-white text-black"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-end">
                                            {/* <div
                                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${isLoading && 'cursor-no-drop'}`}
                                                onClick={isLoading ? null : handleReviewSubmit}
                                            >
                                                Submit
                                            </div> */}
                                            <div
                                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2}`}
                                            >
                                                Submit
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    </div>
                )
            }

        </div>
    );
};


const QuestionReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setAnswerId }: any) => {
    return (
        <>
            <div className="w-full my-3">
                {
                    data[activeVideo]?.questions?.map((item: any, index: any) => (
                        <QuestionItem
                            key={index}
                            data={data}
                            activeVideo={activeVideo}
                            item={item}
                            index={index}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                        />
                    ))
                }
            </div>
        </>
    )
}

const QuestionItem = ({
    data,
    activeVideo,
    item,
    answer,
    setAnswer,
    handleAnswerSubmit
}: any) => {
    console.log("item:",item);
    return (
        <>
            <div className="my-4">
                <div className="flex mb-2">
                    <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px]">
                                {item?.user.name.slice(0, 2)}
                            </h1>
                        </div>
                    </div>
                    <div className="pl-3">
                        <h5 className="text-[20px]">{item?.user.name}</h5>
                        <p>{item?.question}</p>
                        <small className="text-[#ffffff83]">{format(item?.createdAt)} </small>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseContentMedia;
