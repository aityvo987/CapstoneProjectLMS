import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Ratings from '@/app/utils/Rating';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import avatarDefault from "../../../public/assets/avatar.png";
import { styles } from '@/app/styles/styles';
type Props = {
    item: any;
    isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `/course-access/${item._id}`}>
            <div className="w-full min-h-[35vh] dark:bg-slate-500 dak:bg-opacity-20 backdrop-blur border dark: border-[#ffffff1d) border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner">
                <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
                    <Image src={item.thumbnail?.url} layout="fill" objectFit="cover" alt="" />
                </div>
                <br></br>
                <h1 className="font-Poppins text-[16px] text-black dark:text-[#fff] truncate">
                    {item.name}
                </h1>
                <div className="w-full flex items-center justify-between pt-2">
                    <Ratings rating={item.ratings} />
                    <h5 className={`text-black dark:text-[#fff] ${isProfile && 'hidden 800px:inline'}`}>{item.purchased} Students</h5>
                </div>
                <div className="w-full flex items-center justify-between pt-3">
                    <div className="flex">
                        <h3 className="text-black dark:text-[#fff]">{item.price === 0 ? 'Free' : item.price + '$'}</h3>
                        <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
                            {item.estimatedPrice}$
                        </h5>
                    </div>
                    <div className="flex items-center pb-3">
                        <AiOutlineUnorderedList size={20} fill="#fff" />
                        <h5 className="pl-2 text-black dark:text-[#fff]">{item.courseData?.length} Videos</h5>
                    </div>
                </div>
                {item.lecturer && (
                    <div className="dark:bg-gray-600 bg-gray-200 rounded-lg p-2 mt-3">
                        <div className="flex items-center">
                            <Image
                                src={item.lecturer.avatar ? item.lecturer.avatar.url : avatarDefault}
                                alt="User Avatar"
                                width={100}
                                height={100}
                                className={`${styles.avatar}`}
                                style={{
                                    cursor: "pointer",
                                    border: "2px solid #37a39a",
                                    borderRadius: "50%",
                                }}
                            />
                            <h5 className="pl-2 text-[20px] text-black dark:text-[#fff]">{item.lecturer.name}</h5>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default CourseCard;