import { styles } from '@/app/styles/styles';
import React, { FC, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { IoIosAddCircle } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseQuizzesComp: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    handleSubmit: handleCourseSubmit
}) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );
  
    const handleSubmit = (e: any) => {
        e.preventDefault();

    }
    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }



    const handleOptions = () => {
        if (courseContentData[courseContentData.length - 1].quizzes.multipleChoiceQuizzes[0].question!== "" ){
            if (courseContentData[courseContentData.length - 1].quizzes.multipleChoiceQuizzes[0].options.length() === 1 ){
                toast.error("You must put at least two or more answers");
            }
        } else {
            // setActive(active + 1);
            handleCourseSubmit();

        }
    };
    const handleAddEssaysQuizzes = (index: number) => {
        const updatedData = [...courseContentData];
        const essayQuizzes = updatedData[index].quizzes.essayQuizzes;
    
        // Check if the previous questions have all required input fields filled
        const allQuestionsFilled = essayQuizzes.every((quiz: any) => quiz.question.trim() !== "");
        
        if (allQuestionsFilled) {
            essayQuizzes.push({ question: "" });
            updatedData[index].quizzes.essayQuizzes = essayQuizzes;
            setCourseContentData(updatedData);
        } else {
            // Handle the case where not all previous questions have all required input fields filled
            console.log("Please fill all required fields in the previous questions.");
        }
    }
    
    const handleAddMultipleChoiceQuizzes = (index: number) => {
        const updatedData = [...courseContentData];
        const multipleChoiceQuizzes = updatedData[index].quizzes.multipleChoiceQuizzes;
    
        // Check if the previous questions have all required input fields filled
        const allQuestionsFilled = multipleChoiceQuizzes.every((quiz: any) => {
            return quiz.question.trim() !== "" && quiz.options.every((option: string) => option.trim() !== "");
        });
    
        if (allQuestionsFilled) {
            multipleChoiceQuizzes.push({ question: "", options: ["", "", ""], correctOptionIndex: 0 });
            updatedData[index].quizzes.multipleChoiceQuizzes = multipleChoiceQuizzes;
            setCourseContentData(updatedData);
        } else {
            // Handle the case where not all previous questions have all required input fields filled
            console.log("Please fill all required fields in the previous questions.");
        }
    }
    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {
                        const showSectionInput =
                            index === 0 ||
                            item.videoSection !== courseContentData[index - 1].videoSection;

                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                                    }`}
                                >
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className="flex w-full items-center">
                                                    <div className={`text-[20px] ${item.videoSection === "Untitled Section"
                                                        ? "w-[300px]"
                                                        : "w-max"
                                                        } font-Poppins dark:text-white text-black bg-transparent outline-none`}
                                                    >{item.videoSection}
                                                    </div>
                                                </div>
                                                <br />
                                            </>
                                        )
                                    }
                                    <div className="flex w-full items-center justify-between my-0">
                                        {
                                            isCollapsed[index] ? (
                                                <>
                                                    {item.title ? (
                                                        <p className="font-Poppins dark:text-white text-black">
                                                            {index + 1}.{item.title}
                                                        </p>
                                                    ) : <></>
                                                    }
                                                </>
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                        {/*// arrow button for collapsed video content */}
                                        <div className="flex items-center">
                                            <MdOutlineKeyboardArrowDown
                                                fontSize="large"
                                                className="dark:text-white text-black"
                                                style={{
                                                    transform: isCollapsed[index]
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <label className={`${styles.label} text-[20px]`} htmlFor="essay">
                                                    Essay Quizzes
                                                </label>
                                                {
                                                    item?.quizzes?.essayQuizzes.map((essayQuizzes: any, i: number) => (
                                                        <input type="text"
                                                            key={index}
                                                            name="Benefit"
                                                            placeholder="What do you understand about the video?"
                                                            required
                                                            className={`${styles.input} my-2`}
                                                            value={essayQuizzes.title}
                                                            onChange={(e) => {
                                                                const updatedData = [...courseContentData];
                                                                updatedData[index].quizzes.essayQuizzes[i] = e.target.value;
                                                                setCourseContentData(updatedData);
                                                            }}

                                                        />
                                                    ))
                                                }
                                                <IoIosAddCircle
                                                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                                                    onClick={() => handleAddEssaysQuizzes(index)}
                                                />
                                                <br />
                                                <label className={`${styles.label} text-[20px]`} htmlFor="essay">
                                                    Multiple Choice Question
                                                </label>
                                                {
                                                    item?.quizzes?.multipleChoiceQuizzes.map((multipleChoiceQuiz: any, i: number) => (
                                                        <div key={i}>
                                                            <input
                                                                type="text"
                                                                name="Question"
                                                                placeholder="Enter the question"
                                                                required
                                                                className={`${styles.input} my-2`}
                                                                value={multipleChoiceQuiz.question}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContentData];
                                                                    updatedData[index].quizzes.multipleChoiceQuizzes[i].question = e.target.value;
                                                                    setCourseContentData(updatedData);
                                                                }}
                                                            />
                                                            {
                                                                multipleChoiceQuiz.options?.map((option: any, o: number) => (
                                                                    <input
                                                                        type="text"
                                                                        name="Option1"
                                                                        placeholder="Option 1"
                                                                        required
                                                                        className={`${styles.input} my-2`}
                                                                        value={multipleChoiceQuiz.options[0]}
                                                                        onChange={(e) => {
                                                                            const updatedData = [...courseContentData];
                                                                            updatedData[index].quizzes.multipleChoiceQuizzes[i].options[o] = e.target.value;
                                                                            setCourseContentData(updatedData);
                                                                        }}
                                                                    />
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                }
                                                <IoIosAddCircle
                                                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                                                    onClick={() => handleAddMultipleChoiceQuizzes(index)}
                                                />
                                                <br/>

                                            </>
                                        )
                                    }
                                    <br></br>
                                </div>
                            </>
                        );
                    })
                }
                <br></br>

            </form>
            <br></br>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Submit
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}
export default CourseQuizzesComp