"use client";

import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";  // Import the close icon
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
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [upateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<any>([]);

  // Audio setup
  // const [audio] = useState(
  //   new Audio(
  //     "https://res.cloudinary.com/dkpcwsg6z/video/upload/v1730618925/audio/notification_yhsrwt.mp3"
  //   )
  // );

  // const playerNotificationSound = () => {
  //   audio.play();
  // };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }

    // audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      // playerNotificationSound();
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
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center dark:text-white text-black">
          {notifications && notifications.length}
        </span>
      </div>

      {/* Notification Dropdown */}
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white absolute top-16 right-0 z-10 rounded-md shadow-lg">
          <div className="flex justify-between items-center p-3">
            <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white">
              Notifications
            </h5>
            <AiOutlineClose
              className="text-black dark:text-white cursor-pointer"
              onClick={() => setOpen(false)} // Close the notification box
            />
          </div>

          {notifications &&
            notifications.map((item: any, index: number) => (
              <div key={item._id} className="bg-[#00000013] font-Poppins border-b-[#0000000f]">
              <div className="w-full flex items-center justify-between p-2">
                <p className="text-black dark:text-white font-semibold">{item.title}</p>
                <p
                  className="text-black dark:text-white cursor-pointer text-sm"
                  onClick={() => handleNotificationStatusChange(item._id)}
                >
                  {/* Optionally, add mark as read functionality */}
                </p>
              </div>
              <p className="px-2 text-gray-700 dark:text-gray-300">{item.message}</p>
              <p className="p-2 text-gray-500 dark:text-gray-400 text-[14px] italic">
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
