"use client";

import { styles } from "@/app/styles/styles";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password").min(6),
  verifyPassword: Yup.string()
    .required("Please enter your vẻify password")
    .min(6),
});

const ForgetPassword: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [forgetPassword, { data, error, isSuccess }] =
    useForgetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Recovery pasword successful";
      toast.success(message);
      setRoute("Recovery");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      verifyPassword: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password, verifyPassword }) => {
      const data = {
        email,
        password,
        verifyPassword,
      };

      await forgetPassword(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Forgot Your Password?</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your email"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
        </div>

        <div className="w-full mt-3">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your new password
          </label>
          <div className=" relative">
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your new password"
              className={`${
                errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white bg-transparent"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white bg-transparent"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
            {errors.password && touched.password && (
              <span className="text-red-500 pt-2 block">{errors.password}</span>
            )}
          </div>
        </div>

        <div className="w-full mt-3">
          <label className={`${styles.label}`} htmlFor="verifyPassword">
            Verify your new password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="verifyPassword"
            value={values.verifyPassword}
            onChange={handleChange}
            id="verifyPassword"
            placeholder="Verify your new password"
            className={`${
              errors.verifyPassword &&
              touched.verifyPassword &&
              "border-red-500"
            } ${styles.input}`}
          />
        </div>
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Reset Password"
            className={`${styles.button}`}
          />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Remember your password?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </form>
    </div>
  );
};

export default ForgetPassword;
