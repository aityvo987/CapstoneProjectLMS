import AllCourses from '@/app/components/Admin/Course/AllCourses';
import AllUsers from '@/app/components/Admin/Users/AllUsers';
import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Heading from '@/app/utils/Heading';
import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '@/app/styles/styles';
import avatar from "../../../public/assets/avatar.png";
import { BiSearch } from 'react-icons/bi';
import Link from 'next/link';

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const { data, refetch } = useGetHeroDataQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isLoading, isSuccess, error }] = useEditHeroDataMutation();

    useEffect(() => {
        if (data) {
            console.log(data);
            setTitle(data?.layout?.banner.title);
            setSubTitle(data?.layout?.banner.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
        if (isSuccess) {
            refetch();
            toast.success("Hero edited successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage?.data?.message);
            }
        }
    }, [data, isSuccess, error]);

    const handleUpdate = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async () => {
        console.log(image);
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        });
    };

    const isEdited = data?.layout?.banner?.title !== title || 
                     data?.layout?.banner?.subTitle !== subTitle || 
                     data?.layout?.banner?.image?.url !== image;

    return (
        <>
            <div className="w-full 1000px:flex items-center">
                <div className="absolute top-[100px] 1000px:top-[unset]  1500px:h-[500px] 1500px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
                <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[78px] 1000px:pt-[0] z-10">
                    <div className="relative flex items-center justify-center">
                        <img
                            src={image}
                            alt=""
                            className="object-contain 1100px:max-w-[65%] h-[auto] z-[10]"
                        />
                        <input
                            type="file"
                            name=""
                            id="banner"
                            accept="image/*"
                            onChange={handleUpdate}
                            className="hidden"
                        />
                        <label htmlFor="banner" className="absolute bottom-[5px] right-[70px] z-20">
                            <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
                        </label>
                    </div>
                </div>
                <div className="1000px:w-[50%] flex flex-col place-items-center 1000px:mt-[0px] text-center 1000px:text-center mt-[150px] ml-[100px]">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="dark:text-white text-[#000000c7] text-[45px] px-3 w-full font-[600] font-Josefin py-2 1000px:leading-[75px] border-b-2 border-gray-300"
                    />
                    <br />
                    <input
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:w-[55%] 1100px:!w-[78%] border-b-2 border-gray-300"
                    />
                    <br />
                    <br />
                    <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                        <input
                            type="search"
                            placeholder="Search Courses...."
                            className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#fffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#000] dark:text-[#fff] font-[500] font-Josefin"
                        />
                        <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
                            <BiSearch className="text-white" size={30} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
                        <img
                            src={"https://res.cloudinary.com/dkpcwsg6z/image/upload/v1729653998/zqccybrcaxkpbkrcyhbd.png"}
                            alt="Image"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <img
                            src={"https://res.cloudinary.com/dkpcwsg6z/image/upload/v1729653998/awwh5a8iax0tgtl19oz5.png"}
                            width={50}
                            height={50}
                            alt="Image"
                            className="rounded-full ml-[-20px]"
                        />
                        <img
                            src={"https://res.cloudinary.com/dkpcwsg6z/image/upload/v1729653998/sdxgkweqpeegnnq6dosx.png"}
                            alt="Image"
                            width={50}
                            height={50}
                            className="rounded-full ml-[-20px]"
                        />
                        <p className="font-Josefin dark:text-[#edfff4] text-[#000] 1000px:pl-3 text-[18px] font-[600]">
                            500K+ People Trust me Bro.{" "}
                            <Link
                                href="/courses"
                                className="dark:text-[#46e256] text-[crimson]"
                            >
                                View Courses
                            </Link>{" "}
                        </p>
                    </div>
                </div>
            </div>
            <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                <div
                    className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
                        ${isEdited ? "!cursor-pointer!bg-[#42d383]" : "!cursor-not-allowed"} !rounded absolute bottom-12 right-12`}
                    onClick={isEdited ? handleEdit : () => null}
                >
                    Save
                </div>
            </div>
        </>
    );
};

export default EditHero;