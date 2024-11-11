"use client";

import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notification/notificationApi";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false);

  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [upateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);

  //Khởi tạo biến audio
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dkpcwsg6z/video/upload/v1730618925/audio/notification_yhsrwt.mp3"
    )
  );

  //Hàm chơi notificacion audio
  const playerNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    //Ktra notification có tồn tại
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }

    //TH cập nhật trạng thái thông báo thành công
    if (isSuccess) {
      refetch();
    }

    audio.load();
  }, [data, isSuccess]);

  //main useEffect
  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      //gọi hàm playerNOtificatiion
      playerNotificationSound();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    await upateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher></ThemeSwitcher>
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black"></IoMdNotificationsOutline>
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center dark:text-white text-black">
          {/* Số lượng thông báo */}
          {notifications && notifications.length}
        </span>
      </div>
      {/* {open && (
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
      )} */}
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white ">
          <h5 className="text-center text-[20px] font-Poppins text-blackdark: text-white p-3">
            Notifications
          </h5>
          {/* <div className="dark: bg-[#2d3a4e] bg-[#00000013] font-Poppins border-bdark: border-b-[#ffffff47) border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              New Question received at Software design
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              3 days ago
            </p>
          </div> */}
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div className="dark: bg-[#2d3a4e] bg-[#00000013] font-Poppins border-bdark: border-b-[#ffffff47) border-b-[#0000000f]">
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-black dark:text-white cursor-pointer"
                  onClick={()=>handleNotificationStatusChange(item._id)}>
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
