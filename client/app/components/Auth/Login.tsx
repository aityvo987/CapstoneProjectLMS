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
  
  const {errors,touched,values,handleChange,handleSubmit} = formik;
  
  return <div className="w-full">
    <h1 className={`${styles.title}`}>
            Login with Elearning 
    </h1>
    <form onSubmit={handleSubmit}>
        
        <label 
        className={`${styles.label}`}
        htmlFor="email"></label>
    </form>
  </div>;
};

export default Login;
