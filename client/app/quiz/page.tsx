'use client';

import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Quiz from "../components/Quiz/Quiz";
import Essay from "../components/Quiz/Essay";

type Props = {};

// Dữ liệu câu hỏi mẫu
const questions = [
  {
    question: 'What is the capital of France?',
    image: 'https://example.com/france.jpg', // URL hình ảnh mẫu
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Rome', correct: false },
    ],
  },
  {
    question: 'What is 2 + 2?',
    image: null, // Không có hình ảnh
    answers: [
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '6', correct: false },
    ],
  },
];

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const [showQuiz, setShowQuiz] = useState(true); 
  const { data, isLoading, refetch } = useLoadUserQuery(undefined, {});
  const user = data?.user;

  return (
    <div>
      <Heading
        title="Quiz - Elearning"
        description="ELearning is a platform for students to learn get help from lecturers"
        keywords="Progamming,MERN,Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      {/* Nút chuyển đổi giữa Quiz và Essay */}
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 mr-2 ${
            showQuiz ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
          onClick={() => setShowQuiz(true)}
        >
          Show Quiz
        </button>
        <button
          className={`px-4 py-2 ${
            !showQuiz ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
          onClick={() => setShowQuiz(false)}
        >
          Show Essay
        </button>
      </div>

      {/* Hiển thị Quiz hoặc Essay dựa trên trạng thái */}
      {showQuiz ? <Quiz questions={questions} /> : <Essay />}
      <Footer />
    </div>
  );
};

export default Page;
