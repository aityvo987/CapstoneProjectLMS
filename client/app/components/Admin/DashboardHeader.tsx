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
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
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
          <li className="relative">
            <a
              className="flex items-center justify-center text-black dark:text-white"
              href="#"
              id="alertsDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell"></i>
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                3+
              </span>
            </a>
            <div className="hidden group-hover:block absolute right-0 mt-2 w-72 bg-white dark:bg-[#2d3a4ea1] text-gray-800 dark:text-[#fff] shadow-lg rounded-lg overflow-hidden">
              <h6 className="px-4 py-2 bg-gray-100 dark:bg-[#374151] font-semibold">
                Alerts Center
              </h6>
              <a
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#374151]"
                href="#"
              >
                <div className="mr-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                    <i className="fas fa-file-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    December 12, 2019
                  </div>
                  <span className="font-semibold">
                    A new monthly report is ready to download!
                  </span>
                </div>
              </a>
              <a
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#374151]"
                href="#"
              >
                <div className="mr-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
                    <i className="fas fa-donate text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    December 7, 2019
                  </div>
                  $290.29 has been deposited into your account!
                </div>
              </a>
              <a
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#374151]"
                href="#"
              >
                <div className="mr-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full">
                    <i className="fas fa-exclamation-triangle text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    December 2, 2019
                  </div>
                  Spending Alert: We've noticed unusually high spending for your
                  account.
                </div>
              </a>
              <a
                className="block text-center py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                href="#"
              >
                Show All Alerts
              </a>
            </div>
          </li>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
