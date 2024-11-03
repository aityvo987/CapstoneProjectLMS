import AllCourses from "@/app/components/Admin/Course/AllCourses";
import AllUsers from "@/app/components/Admin/Users/AllUsers";
import {
  useEditHeroDataMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Heading from "@/app/utils/Heading";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";

type Props = {};

const EditFAQ = (props: Props) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditHeroDataMutation();

  useEffect(() => {
    console.log(data);
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("FAQ edited successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };
  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };
  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] bg-[#111c43]">
          <div className="mt-12 p-3">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._i !== questions[0]?._id && "border-t"
                  }border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(q._id)}
                    >
                      <input
                        className={`${styles.input} border-none `}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your question..."}
                      />
                      <span className="ml-6 flex-shrink-0 self-center">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12 flex">
                      <input
                        className={`${styles.input} border-none !bg-gray-100 dark:!text-black`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder={"Add your answer..."}
                      />
                      <span className="ml-6 flex-shrink-0 self-center">
                        <AiOutlineDelete
                          className="text-red-500 text-[18px] cursor-pointer self-center"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer ml-3"
              onClick={newFaqHandler}
            />

            <br />
            <br />
            <div
              className={`${
                styles.button
              }!w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                ${
                  areQuestionsUnchanged(data?.layout?.faq, questions) ||
                  isAnyQuestionEmpty(questions)
                    ? "!cursor-not-allowed"
                    : "!cursor-pointer !bg-[#42d383]"
                }
                    !rounded bottom-12 right-12`}
              onClick={
                areQuestionsUnchanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
            >
              Save
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditFAQ;
