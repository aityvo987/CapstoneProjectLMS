import React, { useState } from "react";
import toast from "react-hot-toast";

interface MultipleChoiceQuizzes {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

interface Props {
  questions: MultipleChoiceQuizzes[];
  setIsValidate:any;
}

const Quiz: React.FC<Props> = ({ questions,setIsValidate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOptionIndex(null);
    setShowNextButton(false);
  };

  const handleAnswerClick = (index: number) => {
    setSelectedOptionIndex(index);
    if (index === currentQuestion.correctOptionIndex) {
      setScore(score + 1);
    }
    setShowNextButton(true);
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const scorePercentage = (score / questions.length) * 100;
      if (scorePercentage > 70) {
        setIsValidate(true);
        toast.success(`Your score: ${score} out of ${questions.length}. You can now go to the next lesson`)
        startQuiz();
      } else {
        setIsValidate(false);
        toast.success(`Your score: ${score} out of ${questions.length}`)
        startQuiz();
      }

    }

    setSelectedOptionIndex(null);
    setShowNextButton(false);
  };



  return (
    <div className="quiz-app font-sans">
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mb-4 dark:text-white text-black text-[#3b82f6]">Quiz</h1>
      </div>
      <div className="quiz-container p-6 rounded-lg shadow-md mx-12 dark:bg-[#64748b] bg-[#3b82f6]">
        <h2 className="text-xl mb-4 text-white">{`${currentQuestionIndex + 1}. ${currentQuestion.question
          }`}</h2>

        <div className="answers mb-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-2 mb-2 text-left text-black rounded-md border ${selectedOptionIndex === index
                ? index === currentQuestion.correctOptionIndex
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-white"
                }`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedOptionIndex !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {showNextButton && (
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md"
            onClick={handleNextClick}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
          
        )}
      </div>
    </div>
  );
};

export default Quiz;