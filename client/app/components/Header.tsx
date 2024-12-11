"use client";
import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import ForgetPassword from "../components/Auth/ForgetPassword";
import Recovery from "../components/Auth/Recovery";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.png";
import { styles } from "../styles/styles";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useEditHeroDataMutation } from "@/redux/features/layout/layoutApi";
import Cart from "./Course/Cart/CartComponent";
import { useAddToCartMutation, useAddToUserCartMutation, useDeleteFromCartMutation, useDeleteFromUserCartMutation, useGetCartQuery, useGetUserCartQuery } from "@/redux/features/orders/ordersApi";
import { redirect } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
  changedCartItems?: boolean;
  setChangedCartItems?:any;
};
const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute,changedCartItems, setChangedCartItems,  }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const { data: dataCart, refetch: cartRefetch, error: cartError } = userData === undefined
    ? useGetCartQuery({}, { refetchOnMountOrArgChange: true })
    : useGetUserCartQuery({}, { refetchOnMountOrArgChange: true });

const [addToCart, { isSuccess: addCartSuccess, error: addCartError }] = userData === undefined
    ? useAddToCartMutation({})
    : useAddToUserCartMutation({});

const [deleteFromCart, { isSuccess: deleteCartSuccess, error: deleteCartError }] = userData === undefined
    ? useDeleteFromCartMutation({})
    : useDeleteFromUserCartMutation({});
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });

        }
      }
      if (data === null) {
        //Success
        if (route === "Logout") {
          toast.success("Logout successfully!");
        }

        if (!isLoading && !userData) {
          setRoute("Login");
        }
      }
      if (userData){
        console.log("Redirecting",userData.user);
        if(userData.user.role==="admin"||userData.user.role==="lecturer"){
          redirect("/admin");
        }
      }
      if (dataCart) {
        setCart(dataCart.cartItems);
      }
      if (changedCartItems){
        cartRefetch();
        setChangedCartItems(false);
      }
      if (addCartSuccess) {
        cartRefetch();
        toast.success("Add to cart successfully")
      }
      if (deleteCartSuccess) {
        cartRefetch();
        toast.success("Delete cart successfully")
      }
      if (cartError) {
        if ("data" in cartError) {
          const errorMessage = cartError as any;
          toast.error(errorMessage.data.message);
        }
      }
      if (addCartError) {
        if ("data" in addCartError) {
          const errorMessage = addCartError as any;
          toast.error(errorMessage.data.message);
        }
      }
      if (deleteCartError) {
        if ("data" in deleteCartError) {
          const errorMessage = deleteCartError as any;
          toast.error(errorMessage.data.message);
        }
      }
    }
  }, [data, userData, isLoading, dataCart, addCartSuccess, deleteCartSuccess, 
    addCartError, deleteCartError, changedCartItems,cartError]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };
  const handleToggleCart = () => {
    setShowCart(!showCart);
  };
  const handleDeleteCart = async (courseId:string) => {
    console.log("DeleteCart",courseId);
    await deleteFromCart(courseId);
  };

  return (
    <div className="w-full relative">
      <div
        className={`${active
          ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transistion duration-500"
          : "w-full border-b dark:border-[#fffff1c] h-[80px] z-[80] dark:shadow "
          }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
            >
              Elearning
            </Link>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile user*/}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    width={30}
                    height={30}
                    alt="avatar"
                    className={`${styles.avatar}`}
                    style={{
                      border: activeItem == 5 ? "2px solid #37a39a" : "none",
                    }}
                  ></Image>
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black items-center"
                  onClick={() => setOpen(true)}
                />
              )}
              <HiOutlineShoppingCart
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black items-center"
                onClick={() => handleToggleCart()}
              />
            </div>
          </div>
        </div>
        {/* For mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={
                      userData.user.avatar ? userData.user.avatar.url : avatar
                    }
                    width={30}
                    height={30}
                    alt="avatar"
                    className={`${styles.avatar}w-[30px] h-[30px] rounded-full ml-[20px] cursor-pointer`}
                    style={{
                      border: activeItem == 5 ? "2px solid #37a39a" : "none",
                    }}
                  ></Image>
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black items-center"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © 2024 ELearning
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        {/* Signin */}
        {route === "Login" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Login}
                refetch={refetch}
              />
            )}
          </>
        )}
        {/* Signup */}
        {route === "Sign-up" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={SignUp}
              />
            )}
          </>
        )}
        {/* Verification */}
        {route === "Verification" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Verification}
              />
            )}
          </>
        )}
        {/* Forget-password */}
        {route === "Forget-password" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={ForgetPassword}
              />
            )}
          </>
        )}
        {/* Recovery */}
        {route === "Recovery" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Recovery}
              />
            )}
          </>
        )}
      </div>
      {showCart && (
        <div className="cart-box">
          <Cart cart={cart} setCart={setCart} 
          deleteFromCart={handleDeleteCart} 
          user={userData?.user} setRoute={setRoute} 
          setOpen={setOpen} />
        </div>
      )}

    </div>
  );
};
export default Header;
