import React, { useState } from "react";

interface Answer {
  text: string;
  correct: boolean;
}

interface Question {
  question: string;
  image: string | null;
  answers: Answer[];
}

interface Props {
  questions: Question[];
}

const Quiz: React.FC<Props> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Hàm bắt đầu quiz
  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  // Hàm hiển thị câu hỏi và xử lý câu trả lời
  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    if (currentQuestion.answers[index].correct) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  // Hàm hiển thị nút tiếp theo hoặc kết thúc quiz
  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert(`Your score: ${score} out of ${questions.length}`);
      startQuiz();
    }
    setSelectedAnswer(null);
    setShowNextButton(false);
  };

  return (
    <div className="quiz-app font-sans">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-[#3b82f6]">Quiz</h1>
      </div>
      <div className="quiz-container p-6 rounded-lg shadow-md mx-12 dark:bg-[#64748b] bg-[#3b82f6]">
        {/* Hiển thị câu hỏi */}
        <h2 className="text-xl mb-4 text-white">{`${currentQuestionIndex + 1}. ${
          currentQuestion.question
        }`}</h2>

        {/* Hiển thị hình ảnh nếu có */}
        {/* {currentQuestion.image && (
          <div className="mb-4">
            <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-auto rounded-md"
            />
          </div>
        )} */}

        {/* Hiển thị các nút câu trả lời */}
        <div className="answers mb-4">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`w-full p-2 mb-2 text-left rounded-md border ${
                selectedAnswer === index
                  ? answer.correct
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null} // Chỉ cho phép chọn một câu trả lời
            >
              {answer.text}
            </button>
          ))}
        </div>

        {/* Hiển thị nút tiếp theo */}
        {showNextButton && (
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={handleNextClick}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Restart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
