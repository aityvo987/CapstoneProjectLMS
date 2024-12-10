import avatarDefault from "../../../public/assets/avatar.png";
import React, { FC, useEffect, useState } from "react";
import Ratings from "@/app/utils/Rating";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { styles } from "@/app/styles/styles";
import Link from "next/link";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { useAddToCartMutation, useAddToUserCartMutation } from "@/redux/features/orders/ordersApi";
import toast from "react-hot-toast";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
  setChangedCartItems?:any;
};

const CourseDetail = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,setChangedCartItems
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [loadUser, setLoadUser] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [addToCart, { isSuccess: addCartSuccess, error: addCartError }] = userData === undefined
    ? useAddToCartMutation({})
    : useAddToUserCartMutation({});

  useEffect(() => {
    if (userData) {
      setLoadUser(true);
      setUser(userData.user);

      // Kiểm tra và cập nhật trạng thái purchased
      if (userData.user.courses?.find((item: any) => item._id === data._id)) {
        setIsPurchased(true);
      }
      if (userData.user.courses?.find((item: any) => item._id === data._id)) {
        setIsPurchased(true);
      }
    }
    if (addCartSuccess) {
      toast.success("Add to cart successfully")
      setChangedCartItems(true);

    }
    if (addCartError) {
      if ("data" in addCartError) {
        const errorMessage = addCartError as any;
        toast.error(errorMessage.data.message);
      }
    }
    // Kiểm tra trạng thái đăng nhập khi tải trang
    // if (!userData?.user) {
    //   // Nếu chưa đăng nhập, hiển thị modal đăng nhập
    //   setRoute("Login");
    //   openAuthModal(true);
    // }
  }, [userData,addCartSuccess,addCartError]);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  // const isPurchased =
  //   user && user?.courses?.find((item: any) => item._id === data._id);



  const handleOrder = (e: any) => {
    // console.log('ggg');
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };
  const handleAddToCart = async (e: any) => {
    const courseId = data._id;
    const name = data.name;
    const thumbnail = data.thumbnail;
    const price = data.price;
    const estimatedPrice = data.estimatedPrice;
    await addToCart({courseId, name, thumbnail, price, estimatedPrice});
    
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px: pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br></br>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Lecturer:
            </h1>
            <div className="p-2 mt-3">
              <div className="flex items-center">
                <Image
                  src={data.lecturer?.avatar ? data.lecturer?.avatar?.url : avatarDefault}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className={`${styles.avatar} w-[50px] h-[50px]`}
                  style={{
                    cursor: "pointer",
                    border: "2px solid #37a39a",
                    borderRadius: "50%",
                  }}
                />
                <h5 className="pl-2 text-[20px] text-black dark:text-[#fff]">{data.lecturer ? data.lecturer?.name : "Anonymous Lecturer"}</h5>
              </div>
            </div>
            <br></br>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br></br>
              <br></br>
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br></br>
            <br></br>
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              <CourseContentList data={data.courseData} isDemo={true} />
            </div>

            <br></br>
            <br></br>
            {/* course description*/}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br></br>
            <br></br>
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{""}
                  Course Rating {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br></br>
              {(
                data?.reviews && [...data.reviews].reverse()
              ).map((item: any, index: number) => (
                <div className="w-full pb-4" key={index}>
                  <div className="flex">
                    <div className="w-[50px] h-[50px]">
                      <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <Image
                          src={item.user?.avatar ? item.user?.avatar.url : ""}
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">{item.user.name}</h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="text-black dark:text-white">{item.comment}</p>
                      <small className="text-[#000000d1] dark:text-[#ffffff83]">
                        {format(item.createdAt)}
                      </small>
                    </div>
                    <div className="pl-2 flex 800px:hidden items-center">
                      <h5 className="text-[18px] pr-2 text-black dark:text-white">{item.user.name}</h5>
                      <Ratings rating={item.rating} />
                    </div>

                  </div>
                  {
                    item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <Image
                              src={i.user?.avatar ? i.user?.avatar.url : ""}
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="pl-2 dark:text-white text-black">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>
                            <h5 className="text-[#d1001f] ml-2 text-[20px] capitalize italic drop-shadow-2xl">{i.user.role === "user" ? "" : i.user.role}</h5>
                          </div>
                          <p>{i.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(i.createdAt)}.
                          </small>
                        </div>
                      </div>
                    ))
                  }
                </div>
              ))}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-1 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] ☐ text-black dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data.estimatedPrice}$
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="">
                {isPurchased ? (
                  <div>
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                  
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div
                      className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                      onClick={handleOrder}
                    >
                      Buy Now {data.price}$
                    </div>
                    <div
                      className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                      onClick={handleAddToCart}
                    >
                      Add to cart
                    </div>
                  </div>
                )}

              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">
                • Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Full lifetime access
              </p>
              {/* <p className="pb-1 text-black dark:text-white">
                                • Certificate of completion</p> */}
              <p className="pb-3 800px:pb-1 text-black dark:text-white">
                • Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="rounded-xl w-[500px] min-h-[500px] bg-white shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                ></IoCloseOutline>
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user}></CheckOutForm>
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};
export default CourseDetail;
