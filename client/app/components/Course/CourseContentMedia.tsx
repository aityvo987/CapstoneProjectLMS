import React, { FC, useEffect, useState } from "react";
import { useAddNewAnswerMutation, useAddNewQuestionMutation, useAddNewReviewMutation, useAddNewReviewReplyMutation, useGetAllCoursesQuery, useGetUserCourseDetailQuery, useSubmitEssayAnswerMutation, useUpdateProgressMutation } from "@/redux/features/courses/coursesApi";
import avatarDefault from "../../../public/assets/avatar.png";
import Image from "next/image";
import Ratings from "@/app/utils/Rating";
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar, AiOutlineUnorderedList } from "react-icons/ai";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Quiz from "../Quiz/Quiz";
import Essay from "../Quiz/Essay";

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
  const [questionId, setQuestionId] = useState('');
  const [rating, setRating] = useState(0.5);
  const [review, setReview] = useState('');
  const [essayAnswers, setEssayAnswers] = useState([]);
  const [reviewReply, setReviewReply] = useState('');
  const [reviewId, setReviewId] = useState('');
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isValidate,setIsValidate] = useState(false);
  const [addNewQuestion, { isSuccess, error, isLoading: questionCreateLoading }] = useAddNewQuestionMutation({});
  const [updateProgress, { isSuccess: progressSuccess, error: progressError, isLoading: progressLoading }] = useUpdateProgressMutation({});
  const [addNewAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerCreateLoading }] = useAddNewAnswerMutation({});
  const [addNewReview, { isSuccess: reviewSuccess, error: reviewError, isLoading: reviewCreateLoading }] = useAddNewReviewMutation({});
  const [addNewReviewReply, { isSuccess: reviewReplySuccess, error: reviewReplyError, isLoading: reviewReplyCreateLoading }] = useAddNewReviewReplyMutation({});
  const [submitAnswer, { isSuccess:submitSuccess, error:submitError, isLoading: submitLoading }] = useSubmitEssayAnswerMutation({});
  const { data: dataCourse, refetch: courseRefetch } = useGetUserCourseDetailQuery({ id }, { refetchOnMountOrArgChange: true });

  const isReviewExists = dataCourse?.course.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const totalSections = data.length;

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question must not be empty!");
    } else {
      addNewQuestion({ question, courseId: id, contentId: data[activeVideo]._id });
    }
  }
  const refreshProgress = () => {
    const progress = user.courses.find((course: any) => course._id.toString() === id)?.progress || 0;
    const progressPercentage = (progress / totalSections) * 100;
    setProgressPercentage(progressPercentage);
  }
  useEffect(() => {
    refreshProgress();
    console.log("CourseContent",dataCourse);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Write question successfully!");
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Write reply successfully!");
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0.5);
      courseRefetch();
      toast.success("Write review successfully!");
    }
    if (reviewReplySuccess) {
      setReviewReply("");
      courseRefetch();
      toast.success("Write review reply successfully!");
    }
    if (progressSuccess) {
      refreshProgress();
      toast.success("Update Progress successfully");
    }
    if (submitSuccess) {
      toast.success("Submit home work successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewReplyError) {
      if ("data" in reviewReplyError) {
        const errorMessage = reviewReplyError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (progressError) {
      if ("data" in progressError) {
        const errorMessage = progressError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (submitError) {
      if ("data" in submitError) {
        const errorMessage = submitError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, 
    answerSuccess, answerError, 
    reviewSuccess, reviewError, 
    reviewReplySuccess, reviewReplyError, 
    progressSuccess, progressError,
    submitSuccess,submitError,
  ])

  const handleNextLessonClick = async () => {
    if (isValidate){
      if (data && data.length - 1 !== activeVideo) {
        setActiveVideo(activeVideo + 1);
        try {
          // Call the updateProgressMutation function
          await updateProgress({ userId: user._id, courseId: id, progress: activeVideo + 1 });
        } catch (error) {
          // Handle any errors from updating the progress
          console.error('Error updating progress:', error);
        }
      }
    }
    else {
      toast.error("You must finish the quizzes");
    }


    
  };

  const handleAnswerSubmit = () => {
    if (answer.length === 0) {
      toast.error("Answer must not be empty!");
    } else {
      addNewAnswer({ answer, courseId: id, contentId: data[activeVideo]._id, questionId });
    }
  }
  const handleReviewSubmit = () => {
    if (review.length === 0) {
      toast.error("Review must not be empty!");
    } else {
      addNewReview({ review, rating, courseId: id });
    }
  }
  const handleReviewReplySubmit = () => {
    if (reviewReply.length === 0) {
      toast.error("Review reply must not be empty!");
    } else {
      addNewReviewReply({ comment: reviewReply, courseId: id, reviewId: reviewId });
    }
  }
  const handleSubmitAnswer = () => {
    const courseDataId= data[activeVideo]._id;
    const courseId = dataCourse.course._id;
    submitAnswer({ courseId, courseDataId, essayAnswers });
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
          onClick={handleNextLessonClick}
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded mt-4">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Display progress percentage */}
      <p className="text-sm text-[15px] dark:text-white text-black mt-2">
        {`Progress: ${progressPercentage.toFixed(2)}%`}
      </p>
      <h1 className="pt-2 text-[25px] dark:text-white text-black font-[600]">{data[activeVideo].title}</h1>
      <br></br>
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700) rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews", "Quiz"].map((text, index) => (
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
        <div>
          <p className="text-[18px] dark:text-white text-black whitespace-pre-line mb-3">
            {data[activeVideo]?.description}
          </p>
          <div className="p-2 mt-3">
            <div className="flex items-center">
              <Image
                src={dataCourse?.course?.lecturer?.avatar ? dataCourse?.course?.lecturer?.avatar.url : avatarDefault}
                alt="User Avatar"
                width={50}
                height={50}
                className={`${styles.avatar} w-[50px] h-[50px]`}
                style={{
                  cursor: "pointer",
                  border: "2px solid #37a39a",
                  borderRadius: "50%",
                }}
              />
              <h5 className="pl-2 text-[20px] text-black dark:text-[#fff]">{dataCourse?.course?.lecturer ? dataCourse?.course?.lecturer?.name : "Anonymous Lecturer"}</h5>
            </div>
          </div>
        </div>
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
              className="outline-none bg-transparent ml-3 border dark:border-[#ffffff57] border-[#00000080] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins dark:text-white text-black"
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
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreateLoading={answerCreateLoading}
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
                      <div
                        className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewCreateLoading && 'cursor-no-drop'}`}
                        onClick={reviewCreateLoading ? () => { } : handleReviewSubmit}
                      >
                        Submit
                      </div>

                    </div>
                  </>
                )
              }
              <br></br>
              <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
              <div className="w-full">
                {(dataCourse.course?.reviews && [...dataCourse.course.reviews].reverse()).map((item: any, index: number) => (
                  <div className="w-full my-5 dark:text-white text-black">
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={item.user?.avatar ? item.user?.avatar.url : ""}
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="dark:text-[#ffffff83] text-[#0000009e]">
                          {format(item.createdAt)} .
                        </small>
                      </div>
                    </div>
                    {
                      user.role === "admin" && item.commentReplies.length === 0 && (
                        <span className={`${styles.label} !ml-10 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(true)
                            setReviewId(item._id)
                          }
                          }
                        >
                          Add Reply
                        </span>
                      )
                    }
                    {
                      isReviewReply && reviewId === item._id && (
                        <div className="w-full flex relative dark:text-white text-black">
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={reviewReply}
                            onChange={(e: any) => setReviewReply(e.target.value)}
                            className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000000027] dark:border-[#fff] text-black dark:text-white  p-[5px] w-[95%] ${reviewReply === "" || reviewReplyCreateLoading && 'cursor-not-allowed'}`}

                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1 text-black dark:text-white"
                            onClick={handleReviewReplySubmit}
                            disabled={reviewReply === "" || reviewReplyCreateLoading}
                          >
                            Submit
                          </button>
                        </div>
                      )
                    }
                    {
                      item.commentReplies.map((i: any, index: number) => (
                        <div className="w-full flex 800px:ml-16 my-5">
                          <div className="w-[50px] h-[50px]">
                            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                              <Image
                                src={i.user?.avatar ? i.user?.avatar.url : ""}
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px]">{i.user.name}</h5>
                              <h5 className="text-[#d1001f] ml-2 text-[20px] capitalize italic drop-shadow-2xl">{i.user.role === "user" ? "" : i.user.role}</h5>
                            </div>
                            <p>{i.comment}</p>
                            <small className="text-[#ffffff83]">
                              {format(i.createdAt)}.
                            </small>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                )
                )}
              </div>
            </>
          </div>
        )
      }
      {activeBar === 4 && (
        <div>
          <div className="p-2 mt-3">
            
            {
              data[activeVideo].quizzes?.multipleChoiceQuizzes[0].question !== "" && (
                <Quiz questions={data[activeVideo].quizzes?.multipleChoiceQuizzes} 
                setIsValidate={setIsValidate}/>
              )
            }
            {/* {
              data[activeVideo].quizzes?.essayQuizzes[0].question !== "" && (
                <Essay essayAnswers={essayAnswers} 
                setEssayAnswers={setEssayAnswers} 
                essayQuizzes={data[activeVideo].quizzes?.essayQuizzes} 
                handleSubmitAnswer={handleSubmitAnswer}
                />
              )
            } */}
          </div>
        </div>
      )}
    </div >
  );
};


const QuestionReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, questionId, setQuestionId, answerCreateLoading }: any) => {
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
              questionId={questionId}
              setQuestionId={setQuestionId}
              handleAnswerSubmit={handleAnswerSubmit}
              answerCreateLoading={answerCreateLoading}
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
  questionId,
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  answerCreateLoading
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
              <Image
                src={item.user?.avatar ? item.user?.avatar.url : ""}
                width={50}
                height={50}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </div>
          </div>
          <div className="pl-3 dark:text-white text-black">
            <div className="flex items-center">
              <h5 className="text-[20px]">{item.user.name}</h5>
              <h5 className="text-[#d1001f] ml-2 text-[20px] capitalize italic drop-shadow-2xl">{item.user.role === "user" ? "" : item.user.role}</h5>
            </div>
            <p>{item?.question}</p>
            <small className="dark:text-[#ffffff83] text-[#000000b0]">{format(item?.createdAt)} </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 dark:text-white text-black  cursor-pointer mr-2"
            onClick={() => { setReplyActive(!replyActive), setQuestionId(item._id) }}
          >
            {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply " : "Hide Replies"}
          </span>
          <BiMessage size={20} className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8]" />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#000000b8]">
            {item.questionReplies.length}
          </span>
        </div>
        {
          replyActive && questionId === item._id && (
            <>
              {
                item.questionReplies.map((item: any, index: any) => (
                  <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                    <div>
                      <Image
                        src={item.user?.avatar ? item.user?.avatar.url : ""}
                        width={50}
                        height={50}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>


                    <div className="pl-2">
                      <div className="flex items-center dark:text-white text-black">
                        <h5 className="text-[20px]">{item.user.name}</h5>
                        <h5 className="text-[#d1001f] ml-2 text-[20px] capitalize italic drop-shadow-2xl">{item.user.role === "user" ? "" : item.user.role}</h5>
                      </div>
                      <p>{item.answer}</p>
                      <small className="text-[#ffffff83]">
                        {format(item.createdAt)}.
                      </small>
                    </div>
                  </div>

                ))
              }
              <>
                <div className="w-full flex relative dark:text-white text-black">
                  <input
                    type="text"
                    placeholder="Enter your reply..."
                    value={answer}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000000027] dark:border-[#fff] text-black dark:text-white  p-[5px] w-[95%] ${answer === "" || answerCreateLoading && 'cursor-not-allowed'}`}

                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-1 text-black dark:text-white"
                    onClick={handleAnswerSubmit}
                    disabled={answer === "" || answerCreateLoading}
                  >
                    Submit
                  </button>
                </div>
                <br></br>
              </>
            </>
          )
        }
      </div >
    </>
  )
}

export default CourseContentMedia;


{/* <h1 className="uppercase text-[18px]">
                                {item?.user.name.slice(0, 2)}
                            </h1> */}
