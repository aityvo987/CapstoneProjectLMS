import React, { FC } from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import toase, { toast } from 'react-hot-toast'
import { styles } from '@/app/styles/styles';
type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseDataComp: FC<Props> = ({
    benefits,
    setBenefits,
    prerequisites,
    setPrerequisites,
    active,
    setActive,
}) => {
    const handleBenefitsChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    };
    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }]);
    };
    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites);
    };
    const handleAddPrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }]);
    };
    const prevButton = () => {
        setActive(active - 1);
    }
    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title != "") {
            setActive(active + 1);
        } else {
            toast.error("Please complete all fields to continue!!!")
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the benefits to have this course?
                </label>
                <br>
                </br>
                {
                    benefits.map((benefit: any, index: number) => (
                        <input type="text"
                            key={index}
                            name="Benefit"
                            placeholder="Helps you develop yourself"
                            required
                            className={`${styles.input} my-2`}
                            value={benefit.title}
                            onChange={(e) => handleBenefitsChange(index, e.target.value)}

                        />
                    ))
                }
                <IoIosAddCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefits}
                />
            </div>
            {/*Add prerequisites */}
            <div>
                <label className={`${styles.label} text-[20px]`} htmlFor="email">
                    What are the prerequisites you need to have before starting this course?
                </label>
                <br>
                </br>
                {
                    prerequisites.map((prerequisite: any, index: number) => (
                        <input type="text"
                            key={index}
                            name="Prerequisites"
                            placeholder="Have passion in Information Technology"
                            required
                            className={`${styles.input} my-2`}
                            value={prerequisite.title}
                            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}

                        />
                    ))
                }
                <IoIosAddCircle
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddPrerequisites}
                />
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>

        </div>
    )
}
export default CourseDataComp