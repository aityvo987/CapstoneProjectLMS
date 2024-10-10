import React, { FC } from 'react'
import { IoIosAddCircle } from 'react-icons/io'

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
    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits);
    }
    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label className={`nameLabel text-[20px]`} htmlFor="email">
                    What are the benefits to have this course?
                </label>
                <br>
                </br>
                {
                    benefits.map((benefit: any, index: number) => (
                        <input type="text"
                            key={index}
                            name="Benefit"
                            placeholder="You will be able to build a full stack LMS Platform..."
                            required
                            className={`nameInput my-2`}
                            value={benefit.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}

                        />
                    ))
                }
                <IoIosAddCircle></IoIosAddCircle>
            </div>
        </div>
    )
}
export default CourseDataComp