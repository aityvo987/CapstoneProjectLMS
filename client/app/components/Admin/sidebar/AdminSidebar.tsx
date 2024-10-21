"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
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

  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Sidebar Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="10px"
          >
            <Typography variant="h6">Admin Panel</Typography>
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
            </IconButton>
          </Box>

          {/* User Avatar */}
          <Box display="flex" justifyContent="center" mb={2}>
            <Image
              src={avatarDefault}
              alt="User Avatar"
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
            />
          </Box>

          {/* Menu Items */}
          <Item title="Dashboard" to="/admin/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Users" to="/admin/users" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Reports" to="/admin/reports" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Analytics" to="/admin/analytics" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Map" to="/admin/map" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Groups" to="/admin/groups" icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Videos" to="/admin/videos" icon={<OndemandVideoIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Web" to="/admin/web" icon={<WebIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Quizzes" to="/admin/quizzes" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Articles" to="/admin/articles" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />
          <Item title="History" to="/admin/history" icon={<ManageHistoryIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Settings" to="/admin/settings" icon={<SettingsIcon />} selected={selected} setSelected={setSelected} />
          <Item title="Logout" to="/logout" icon={<ExitToAppIcon />} selected={selected} setSelected={setSelected} />
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default AdminSidebar;
