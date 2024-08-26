import { MdOutlineSaveAs } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import CustomErrorMsg from "./CustomErrorMsg";
import * as Yup from "yup";

const NoteForm = ({ isCreate }) => {
  const initialValues = {
    title: "",
    content: "",
  };

  // const validate = (values) => {
  //   const errors = {};
  //   if (values.title.trim().length < 10) {
  //     errors.title = "Tile must have at least 10 words";
  //   }

  //   if (values.context.trim().length < 10) {
  //     errors.context = "Tile must have at least 10 words";
  //   }

  //   return errors;
  // };

  const noteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .min(3, "Content is too short")
      .required("Content is required"),
  });

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center">
      <div className="flex w-[90%] items-center justify-between">
        <h1 className="my-5 text-2xl font-bold text-slate-900">
          {isCreate ? "Create New Note Here." : "Edit your note."}
        </h1>
        <Link to={"/"} className="hover:text-slate-400">
          <FaArrowLeftLong size={30} />
        </Link>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={noteFormSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched }) => (
          <Form action="" className="flex w-full flex-col items-center">
            <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
              <label htmlFor="title" className="font-semibold text-slate-900">
                Note Title
              </label>
              <Field
                type="text"
                name="title"
                className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
              />
            </div>
            <CustomErrorMsg name="title" />
            <div className="mx-auto mb-3 flex w-[90%] flex-col gap-2">
              <label htmlFor="content" className="font-semibold text-slate-900">
                Note content
              </label>
              <Field
                as="textarea"
                name="content"
                className="rounded border-2 border-slate-400 p-1 indent-2 focus:outline-none"
                rows={6}
              ></Field>
            </div>
            <CustomErrorMsg name="content" />
            <button
              className="my-2 w-[90%] rounded-md bg-slate-300 p-2 font-bold text-slate-900 hover:bg-slate-600 hover:text-slate-100"
              type="submit"
            >
              <div className="flex items-center justify-center gap-1">
                <MdOutlineSaveAs size={24} />
                <span>Save Note</span>
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteForm;
