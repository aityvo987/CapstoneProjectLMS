import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { PassThrough } from "stream";
import { styles } from "../../styles/styles";
import { Password } from "@mui/icons-material";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  password: Yup.string().required("Please enter your password").min(6),
});

const Login: Fc<Props> = (props: Props) => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
      props.setRoute("/dashboard");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with Elearning</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1"></div>
        <label htmlFor="password" className={`${styles.label}`}>
          Enter your password
        </label>
        <input
          type={!show ? "password" : "text"}
          name="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          placeholder="password!@%"
          className={`${
            errors.password && touched.password && "border-red-500"
          } ${styles.input}`}
        />
        {!show ? (
          <AiOutlineEyeInvisible
            className="absolute bottom-6 right-5   z-1 cursor-pointer text-black dark:text-white bg-transparent"
            size={20}
            onClick={() => setShow(true)}
          />
        ) : (
          <AiOutlineEye
            className="absolute bottom-6 right-5   z-1 cursor-pointer text-black dark:text-white bg-transparent"
            size={20}
            onClick={() => setShow(false)}
      
          />
        )}
      </form>
    </div>
  );
};

export default Login;
