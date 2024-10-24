import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-center p-6 fixed top-5 right-0">
      <ThemeSwitcher></ThemeSwitcher>
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black"></IoMdNotificationsOutline>
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center dark:text-white text-black">
          3
        </span>
      </div>
      {open && (
        <div className="w-[135px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins dark:text-white text-black p-3">
            {" "}
            Notifications{" "}
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">New Question Receive</p>
              <p className="text-black dark:text-white cursor-pointer">Mark as read</p>
            </div>
            <p className="text-black dark:text-white px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate distinctio rem repudiandae sint delectus corrupti culpa ipsa aperiam. Quo numquam veritatis facere dicta molestiae. Sit magni dignissimos reiciendis corrupti nisi!</p>
            <p className="text-black dark:text-white p-2">5 days ago</p>

          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
