import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";

import CustomErrorMsg from "./CustomErrorMsg";

const AuthForm = ({ isLogin }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const authFormSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must have at least 4 words")
      .max(10, "Username should not be more than 10 words")
      .required("Username is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter an valid email"),
    password: Yup.string()
      .min(6, "Password must have at least 6 letters")
      .required("Password is required"),
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center">
      <div className="flex w-[90%] items-center justify-between">
        <h1 className="my-5 text-2xl font-bold text-slate-900">
          {isLogin ? "Login Here" : "Register an account"}
        </h1>
        <Link to={"/"} className="hover:text-slate-400">
          <FaArrowLeftLong size={30} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={submitHandler}
        validationSchema={authFormSchema}
      >
        {() => (
          <Form className="flex w-full flex-col items-center">
            <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
              <label
                htmlFor="username"
                className="font-semibold text-slate-900"
              >
                Username
              </label>
              <Field
                type="text"
                name="username"
                className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
              />
            </div>
            <CustomErrorMsg name="username" />
            <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
              <label htmlFor="email" className="font-semibold text-slate-900">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
              />
            </div>
            <CustomErrorMsg name="email" />
            <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
              <label
                htmlFor="password"
                className="font-semibold text-slate-900"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
              />
            </div>
            <CustomErrorMsg name="password" />
            <button
              className="my-2 w-[90%] rounded-md bg-slate-300 p-2 font-bold text-slate-900 hover:bg-slate-600 hover:text-slate-100"
              type="submit"
            >
              <div className="flex items-center justify-center gap-1">
                {isLogin ? "Login" : "Register"}
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
