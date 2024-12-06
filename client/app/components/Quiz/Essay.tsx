"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // CSS của Quill
import toast from "react-hot-toast";

type Props = {};

const Essay: React.FC<Props> = () => {
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Answer:", answer);
    toast.success("Your answer has been submitted!");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 dark:text-white">Question 1</h1>
      <p className="mb-4 dark:text-white">
        Write a detailed essay about the importance of sustainable development
        in modern society.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Quill Editor */}
        <ReactQuill
          className="dark:bg-white"
          theme="snow"
          value={answer}
          onChange={setAnswer}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"], // Remove formatting
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
          style={{ height: "300px", overflowY: "auto" }} // Inline style cho chiều cao
        />

        {/* Submit Button */}
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
