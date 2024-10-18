
import React, { FC, useState } from 'react'

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }
    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result });
            }
            reader.readAsDataURL(file);
        }
    }


    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className={`nameLabel`}>
                {/*Course Name */}
                <div>
                    <label htmlFor="">
                        Course Name
                    </label>
                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        id="name"
                        placeholder="MERN stack LMS platform"
                        className={`nameInput`}
                    />
                </div>
                <br>
                </br>
                {/*Course Description */}
                <div className="mb-5">
                    <label className={`nameLabel`}>Course Description</label>
                    <textarea name="" id="" cols={30} rows={8}
                        placeholder='Write something to help student understand the meaning of the course'
                        className={`nameInput !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                    ></textarea>
                </div>
                <br></br>
                {/*Course Price */}
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`nameLabel`}>
                            Course Price
                        </label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            id="price"
                            placeholder="29"
                            className={`nameInput`}
                        />
                    </div>
                    <div className="w-[45%]">
                        <label className={`nameLabel`}>
                            Estimated Price (optional)
                        </label>
                        <input
                            type="number"
                            name=""
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            id="price"
                            placeholder="79"
                            className={`nameInput`}
                        />
                    </div>
                </div>
                <br></br>
                {/*Course Tags */}
                <div className="w-[45%]">
                    <label className={`nameLabel`} htmlFor="email">
                        Course Tags
                    </label>
                    <input
                        type="text"
                        name=""
                        required
                        value={courseInfo.tags}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, tags: e.target.value })
                        }
                        id="tags"
                        placeholder="MERN,Next,tailwind,LMS"
                        className={`nameInput`}
                    />
                </div>
                <br></br>
                {/*Course Level */}
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label className={`nameLabel`} htmlFor="email">
                            Course Level
                        </label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id="level"
                            placeholder="Beginner/Intermediate/Expert"
                            className={`nameInput`}
                        />
                    </div>
                    {/*Course Level */}
                    <div className="w-[50%]">
                        <label className={`nameLabel w-[50%]`} >
                            Demo URl
                        </label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id="demoUrl"
                            placeholder="eer74fd"
                            className={`nameInput`}
                        />
                    </div>
                </div>
                <br></br>
                <div className="w-full">
                    <input
                        type="file"
                        accept="iamge/*"
                        id="file"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {
                            courseInfo.thumbnail ? (
                                <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover" />
                            ) : (
                                <span className="text-black dark:text-white">
                                    Drag and drop your thumbnail here or click to browse
                                </span>
                            )
                        }
                    </label>
                </div>
                <br></br>
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    />
                </div>
                <br></br>
                <br></br>
            </form>
        </div>
    )
}
export default CourseInformation