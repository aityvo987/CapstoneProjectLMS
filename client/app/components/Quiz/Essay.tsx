import React, { useState } from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EssayQuestion {
  question: string;
  _id: string;
}

interface EssayAnswer {
  questionId: string;
  answer: string;
}

type Props = {
  essayAnswers: any;
  setEssayAnswers: any;
  essayQuizzes: EssayQuestion[];
  handleSubmitAnswer:any;
};

const Essay: React.FC<Props> = ({ essayQuizzes, setEssayAnswers, essayAnswers,handleSubmitAnswer }) => {
  // Initialize essayAnswers if it's empty
  if (essayAnswers.length === 0) {
    const initialAnswers = essayQuizzes.map((quiz) => ({
      questionId: quiz._id,
      answer: ""
    }));
    setEssayAnswers(initialAnswers);
  }

  const handleAnswerChange = (index: number, value: string) => {
    const updatedEssayAnswers = [...essayAnswers];
    updatedEssayAnswers[index] = {
      questionId: essayQuizzes[index]._id,
      answer: value
    };
    setEssayAnswers(updatedEssayAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    handleSubmitAnswer();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 dark:text-white">Essay Questions</h1>
      <form onSubmit={handleSubmit}>
        {essayQuizzes.map((quizz, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold dark:text-white">Question {index + 1}</h2>
            <p className="mb-2 dark:text-white">{quizz.question}</p>
            <ReactQuill
              className="dark:bg-white text-black"
              theme="snow"
              value={essayAnswers[index] ? essayAnswers[index].answer : ''}
              onChange={(value) => handleAnswerChange(index, value)}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "list",
                "bullet",
                "link",
                "image",
              ]}
              style={{ height: "150px", overflowY: "auto" }}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Essay;