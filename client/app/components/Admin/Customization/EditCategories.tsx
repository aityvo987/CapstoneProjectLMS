import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/styles';
import { useEditHeroDataMutation, useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {};

const EditCategories: FC<Props> = (props: Props) => {
    const [categories, setCategories] = useState<any[]>([]);
    const { data, refetch } = useGetHeroDataQuery("Categories", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isLoading, isSuccess, error }] = useEditHeroDataMutation();

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
        if (isSuccess) {
            refetch();
            toast.success("Categories edited successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage?.data?.message);
            }
        }
    }, [data, isSuccess, error]);

    const handleCategoriesAdd = (id: any, value: string) => {
        setCategories((prevCategory: any) =>
            prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
        );
    };

    const newCategoriesHandler = async () => {
        if (categories[categories.length - 1]?.title === "") {
            toast.error("Category title cannot be empty");
        } else {
            setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
        }
    };

    const areCategoriesUnchanged = (
        originalCategories: any[],
        newCategories: any[]
    ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyCategoryEmpty = (categories: any[]) => {
        return categories.some((c) => c.title === "");
    };

    const editCategoriesHandler = async () => {
        if (!areCategoriesUnchanged(data?.layout?.categories, categories) && !isAnyCategoryEmpty(categories)) {
            await editLayout({
                type: "Categories",
                categories: categories,
            });
        }
    };

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className="min-h-screen flex flex-col justify-between"> {/* Set full screen height */}
                        <div className="mt-[120px] text-center flex-grow"> {/* Use flex-grow to fill remaining space */}
                            <h1 className={`${styles.title}`}>All Categories</h1>
                            {categories && categories.map((item: any, index: number) => {
                                return (
                                    <div className="flex justify-center mb-2">
                                        <div className="flex items-center w-fit justify-center gap-2 dark:bg-[#101725] mt-1 p-3 border border-[#2190ff] rounded ">
                                            <input
                                                className={`${styles.input} !mt-0 !w-[unset] !border-none ! text-[20px]  `}
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleCategoriesAdd(item._id, e.target.value)
                                                }
                                                placeholder="Enter category title..."
                                            />
                                            <AiOutlineDelete
                                                className="text-red-500 text-[18px] cursor-pointer"
                                                onClick={() => {
                                                    setCategories((prevCategory: any) =>
                                                        prevCategory.filter((i: any) => i._id !== item._id)
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                            <div className="w-full flex justify-center mb-3 ">
                                <IoMdAddCircleOutline
                                    className="text-[#2190ff] text-[25px] cursor-pointer"
                                    onClick={newCategoriesHandler}
                                />
                                <div
                                    className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black absolute right-14
                                    
                                    ${areCategoriesUnchanged(data?.layout?.categories, categories) ||
                                            isAnyCategoryEmpty(categories)
                                        ? "!cursor-not-allowed"
                                        : "cursor-pointer bg-[#42d383]"
                                    }
                                    !rounded`}
                                    onClick={
                                        areCategoriesUnchanged(data?.layout?.categories, categories) ||
                                        isAnyCategoryEmpty(categories)
                                        ? () => null
                                        : editCategoriesHandler
                                    }
                                >
                                    Save
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default EditCategories;
