"use client";

import React, { FC, useEffect, useState } from "react";
import { styles } from "@/app/styles/styles";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};


const FAQ: FC<Props> = () => {
    const { data, isSuccess,error } = useGetHeroDataQuery("FAQ", {

    });
    const [activeQuestions, setActiveQuestions] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);


    useEffect(() => {
        if (isSuccess){
            setQuestions(data?.layout?.faq);
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                console.log(errorMessage);
            }
        }
        
    }, [data]);

    const toggleQuestion = (id: any) => {
        setActiveQuestions(activeQuestions === id ? null : id)
    };
    return (
        <div>
            <div className="w-[90%] 800px:w-[80%] m-auto">
                <h1 className={`${styles.title} 800px:text-[40px]`}>
                    Frequently Asked Questions
                </h1>

                <div className="mt-12">
                    <dl className="space-y-8">
                        {questions.map((q) => (
                            <div key={q.id}
                                className={`${q._id !== questions[0]?._id && "border-t"
                                    } border-gray-200 pt-6`}
                            >
                                <dt className="text-lg">
                                    <button
                                        className="flex items-start justify-between w-full text-left focus:outline-none"
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <span className="font-medium text-black dark:text-white">
                                            {q.question}
                                        </span>
                                        <span className="ml-6 flex-shrink-0">
                                            {activeQuestions === q._id ? (
                                                <HiMinus className="h-6 w-6 text-black dark:text-white" />
                                            ) : (
                                                <HiPlus className="h-6 w-6 text-black dark:text-white" />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {activeQuestions === q._id && (
                                    <dd className="mt-2 pr-12">
                                        <p className="text-base font-Poppins text-black dark:text-white">
                                            {q.answer}
                                        </p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </div>
    );
};

export default FAQ;
