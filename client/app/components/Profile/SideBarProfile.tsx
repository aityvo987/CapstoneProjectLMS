import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../../public/assets/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div>
      <div className="w-full ">
        {/* avatar */}
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
          onClick={() => setActive(1)}
        >
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            width={30}
            height={30}
            alt=""
            className="w-[30px] h-[30px] 800px:w-[30px] 800px:-[30px] cursor-pointer rounded-full "
          ></Image>
          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            My Account
          </h5>
        </div>
        {/* password */}
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
          onClick={() => setActive(2)}
        >
          <RiLockPasswordLine size={30} fill="#fff"></RiLockPasswordLine>

          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Change Password
          </h5>
        </div>
        {/* Enrolled Class */}
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
          onClick={() => setActive(3)}
        >
          <SiCoursera size={30} fill="#fff"></SiCoursera>

          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Enrolled Course
          </h5>
        </div>
        {/* Admin dashboard */}
        {(user.role === "admin" || user.role === "lecturer") && (
          <Link
            className={`w-full flex gap-2 items-center py-3 px-4 cursor-pointer${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
              }`}
            href={"/admin"}
          >
            <MdOutlineAdminPanelSettings
              size={30}
              fill="#fff"
            ></MdOutlineAdminPanelSettings>
            <h5 className="dark:text-white text-black">{user.role === "admin" ? "Admin Dashboard" : "Lecturer Dashboard"}</h5>
          </Link>


        )}

        {/* LogOut */}
        <div
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
            }`}
          onClick={() => logOutHandler()}
        >
          <AiOutlineLogout size={30} fill="#fff"></AiOutlineLogout>

          <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">
            Log out
          </h5>
        </div>
      </div>
    </div>
  );
};

export default SideBarProfile;
