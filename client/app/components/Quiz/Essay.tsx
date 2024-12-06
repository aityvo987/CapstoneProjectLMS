import React, { useState } from "react";
import toast from "react-hot-toast";

interface EssayQuestion {
  question: string;
}

type Props = {
  essayQuizzes: EssayQuestion[];
};

const Essay: React.FC<Props> = ({ essayQuizzes }) => {
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Answer:", answer);
    toast.success("Your answer has been submitted!");
    setAnswer(""); // Clear the answer field after submission
  };

  if (essayQuizzes.length === 0) {
    return <div>No essay questions available.</div>;
  }

  const currentQuestion = essayQuizzes[0]; // Display the first essay question

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 dark:text-white">Essay Question</h1>
      <p className="mb-4 dark:text-white">{currentQuestion.question}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 dark:bg-white rounded border"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your essay here..."
          rows={10}
        />

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