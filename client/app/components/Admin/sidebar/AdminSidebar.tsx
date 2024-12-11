"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
} from "../Icon"; // Đảm bảo bạn đã định nghĩa các icon này
import avatarDefault from "../../../../public/assets/avatar.png"; // Sửa lại đường dẫn nếu cần
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { IoMdList } from "react-icons/io";
import { styles } from "@/app/styles/styles";
import { QuestionMarkOutlined } from "@mui/icons-material";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useLogOutQuery } from "@/redux/features/auth/authApi";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void; // Đổi kiểu cho setSelected
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }
  const handleLogout = async () => {
    toast.success("Logout successfully!");
    signOut();
    await setLogout(true);

    // redirect("/"); 
    // ==> Automatically redirect to homepage thank to Protected component
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${theme === "dark" ? "#111C43 !important" : "#fff !important"
            }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item.active": {
          color: "#868dfb !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-menu-item": {
          color: `${theme !== "dark" && "#000"}`,
        },
      }}
      className="!bg-white dark:bg-[#111C43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isCollapsed ? "0%" : "16%",
          height: "100vh",
          zIndex: 1000,
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <Menu iconShape="square">
          {/* Sidebar Header */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0 20px" }}
          ></MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              {/* User Avatar */}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className={`${styles.avatar} w-[100px] h-[100px]`}
                  style={{
                    cursor: "pointer",
                    border: "3px solid #5b6fe6",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text:black dark:text-[#fff]"
                  sx={{ m: "10px 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[20px] text:black dark:text-[#fff] capitalize"
                  sx={{ m: "10px 0 0" }}
                >
                  - {user?.role}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  {isCollapsed ? (
                    <ArrowForwardIosIcon className="text:black dark:text-[#fff]" />
                  ) : (
                    <ArrowBackIosIcon />
                  )}
                </IconButton>
              </Box>
              {/* Menu Items */}
              <div>
                {
                  user.role === "admin" ? (
                    <>
                      <Item
                        title="Dashboard"
                        to="/admin"
                        icon={<HomeOutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                        {!isCollapsed && "Data"}
                      </Typography>
                      <Item
                        title="Users"
                        to="/admin/users"
                        icon={<GroupsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />

                      <Item
                        title="Invoices"
                        to="/admin/invoices"
                        icon={<ManageHistoryIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                      </Typography>
                      {/* Customize */}
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                        {!isCollapsed && "Customize"}
                      </Typography>
                      <Item
                        title="FAQ"
                        to="/admin/faq"
                        icon={<QuizIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Categories"
                        to="/admin/categories"
                        icon={<IoMdList />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Hero"
                        to="/admin/hero"
                        icon={<WebIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* Analytics Section */}
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                        {!isCollapsed && "Analytics"}
                      </Typography>
                      <SubMenu
                        title="Analytics"
                        icon={<BarChartOutlinedIcon />}
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Item
                          title="Courses"
                          to="/admin/courses-analytics"
                          icon={<WysiwygIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="Users"
                          to="/admin/users-analytics"
                          icon={<PeopleOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                          title="Orders"
                          to="/admin/orders-analytics"
                          icon={<ReceiptOutlinedIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </SubMenu>

                      {/* Controller section */}
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                        {!isCollapsed && "Controller"}
                      </Typography>
                      <Item
                        title="Manage Team"
                        to="/admin/team"
                        icon={<GroupsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />

                      {/* Extra section */}
                      <Typography
                        variant="h5"
                        className="!text-[18px] text:black dark:text-[#fff] capitalize !font-[400]"
                        sx={{ m: "15px 0 5px 25px" }}
                      >
                        {!isCollapsed && "Extras"}
                      </Typography>
                      {/* Setting */}
                      <Item
                        title="Settings"
                        to="/admin/settings"
                        icon={<SettingsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* Logout */}
                      <button className="pl-6" onClick={handleLogout}>
                        <ExitToAppIcon /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Create Course */}
                      <Item
                        title="Create course"
                        to="/admin/create-course"
                        icon={<VideoCallIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* Courses */}
                      <Item
                        title="Courses"
                        to="/admin/courses"
                        icon={<OndemandVideoIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* Logout */}
                      <Item
                        title="Manage Quiz"
                        to="/admin/manage-quizzes"
                        icon={<QuestionMarkOutlined />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* Logout */}
                      <button className="pl-6" onClick={handleLogout}>
                        <ExitToAppIcon /> Logout
                      </button>
                    </>

                  )
                }
              </div>

            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
