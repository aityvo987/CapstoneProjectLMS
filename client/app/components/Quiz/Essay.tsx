
'use client'

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
      <h1 className="text-xl font-bold mb-4">Question 1</h1>
      <p className="mb-4">
        Write a detailed essay about the importance of sustainable development
        in modern society.
      </p>

      <form onSubmit={handleSubmit}>
        {/* TinyMCE Editor */}
        <Editor
          apiKey="your-tinymce-api-key"
          value={answer}
          init={{
            height: 300,
            menubar: false,
            plugins: ["advlist", "autolink", "lists", "link", "image"],
            toolbar:
              "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image",
          }}
          onEditorChange={(content) => setAnswer(content)}
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
