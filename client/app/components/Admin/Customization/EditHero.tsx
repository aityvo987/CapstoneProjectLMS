
import AllCourses from '@/app/components/Admin/Course/AllCourses';
import AllUsers from '@/app/components/Admin/Users/AllUsers';
import { useEditLayoutMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Heading from '@/app/utils/Heading';
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

type Props = {
}

const EditHero: FC<Props> = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const { data,refetch } = useGetHeroDataQuery("Banner", {
        refetchOnMounthOrArgChange: true,
    });
    const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

    useEffect(() => {
        if (data) {
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
    }, [data, isSuccess, error])

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
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        });
    };
    return (
        <>
            <div className="w-full 1000px:flex items-center">
                <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[500px] 1100px:w-[500px] h-[50vh] w-[50vh] hero_animation rounded-[50%] 1100px:left-[18rem] 1500px:left-[21rem]"></div>
                I<div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[78px] 1000px:pt-[0] z-10">
                    <div className="relative flex items-center justify-end">
                        <img
                            src={image}
                            alt=""
                            className="object-contain 1100px:max-w-[90%] w- [90%] 1500px:max-w-[85%] h-[auto] z-[10]"
                        />
                        <input
                            type="file"
                            name=""
                            id="banner"
                            accept="image/*"
                            onChange={handleUpdate}
                            className="hidden"
                        />
                        <label htmlFor="banner" className="absolute bottom-0 right-0 z-20">
                            <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
                        </label>
                    </div>
                </div>
                <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
                    <div
                        className={`${styles.button
                            }!w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                                    ${data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image
                                ? "!cursor-pointer!bg-[#42d383]"
                                : "!cursor-not-allowed"
                            } !rounded absolute bottom-12 right-12`}
                        onClick={
                            data?.layout?.banner?.title !== title ||
                                data?.layout?.banner?.subTitle !== subTitle ||
                                data?.layout?.banner?.image?.url !== image
                                ? handleEdit
                                : () => null
                        }
                    >
                        Save
                    </div>

                </div>
            </div>
        </>
    )
}
export default EditHero