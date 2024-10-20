import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/styles";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Email from "next-auth/providers/email";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const imageHandler = async (e: any) => {
    // const fileReader = new FileReader();

    // fileReader.onload = () => {
    //   if (fileReader.readyState === 2) {
    //     const avatar = fileReader.result;
    //     updateAvatar(avatar);
    //   }
    // };
    // fileReader.readAsDataURL(e.target.files[0]);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file); // 'avatar' là tên tham số bạn cần gửi

    // Gọi API để upload ảnh
    updateAvatar(formData);
  };

  useEffect(() => {
    //Update avatar
    if (isSuccess || success) {
      setLoadUser(true);
    }

    //Edit profile
    if(success){
      toast.success("Profile updated successfully!")
    }

    if (error) {
      console.log("An error occurred", error);
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile({
        name: name,
        // email: user.email,
      });
    }
  };
  return (
    <>
      <div className="w-full flex flex-col justify-center px-4 800px:mt-4">
        <div className="relative flex justify-center">
          <div className="relative">
            <Image
              src={
                user.avatar || avatar
                  ? user.avatar.url || avatar
                  : avatarDefault
              }
              width={120}
              height={120}
              // priority
              alt="avatar"
              className="w-[120px] h-[120px]  cursor-pointer rounded-full border-[3px] border-[#37a39a] relative "
            ></Image>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jpeg, image/webp"
            />
            <label htmlFor="avatar">
              <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer ">
                <AiOutlineCamera size={20} className="z-1" fill="white" />
              </div>
            </label>
          </div>
        </div>
        <br />
        <br />
        <div className="w-full pl-6 800px:pl-10">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="w-[100%] pt-2">
              <div className="w-[100%]">
                <label
                  htmlFor="fullName"
                  className="block pb-2 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${styles.input} w-[95%] mb-1 800px:mb-0`}
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="w-[100%] pt-2">
              <label htmlFor="email" className="block pb-2 dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                id="email"
                readOnly
                value={user?.email}
                required
                className={`${styles.input} w-[95%] mb-1 800px:mb-0`}
              />
            </div>

            {/* Update Button */}
            <input
              type="submit"
              value="Update"
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
            />
          </form>
          <br />
        </div>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
