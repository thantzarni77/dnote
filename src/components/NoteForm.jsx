import { MdOutlineSaveAs } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuHardDriveUpload } from "react-icons/lu";
import { Link, Navigate, redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import CustomErrorMsg from "./CustomErrorMsg";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const NoteForm = ({ isCreate }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [oldNote, setOldNote] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

  const fileRef = useRef();

  const { id } = useParams();
  const getOldNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/edit/${id}`);
    if (response.status === 200) {
      const oldNote = await response.json();
      setOldNote(oldNote);
    } else {
      setIsRedirect(true);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      getOldNote();
    }
  }, []);

  const initialValues = {
    title: isCreate ? "" : oldNote.title,
    content: isCreate ? "" : oldNote.content,
    noteID: isCreate ? "" : oldNote._id,
    cover_img: isCreate ? "" : oldNote.cover_img,
  };

  const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];

  const noteFormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .min(3, "Content is too short")
      .required("Content is required"),
    cover_img: Yup.mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "This file format is not supported",
        (value) => !value || SUPPORTED_FORMATS.includes(value.type),
      ),
  });

  const handleImageChange = (e, setFieldValue) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
      setFieldValue("cover_img", selectedImage);
    }
  };

  const clearPreviewImage = (setFieldValue) => {
    setPreviewImage(null);
    setFieldValue("cover_img", null);
    if (isCreate) {
      fileRef.current.value = "";
    }
  };

  const submitHandler = async (values) => {
    let API = `${import.meta.env.VITE_API}`;
    if (isCreate) {
      API = `${import.meta.env.VITE_API}/create`;
    } else {
      API = `${import.meta.env.VITE_API}/edit`;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("cover_img", values.cover_img);
    formData.append("noteID", values.noteID);

    const response = await fetch(API, {
      method: "post",
      body: formData,
    });
    if (response.status === 201 || response.status === 200) {
      setIsRedirect(true);
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  if (isRedirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mx-auto flex w-[90%] flex-col items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
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
        enableReinitialize={true}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form
            encType="multipart/form-data"
            className="flex w-full flex-col items-center"
          >
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
              <div className="flex justify-between">
                <label
                  htmlFor="cover_img"
                  className="font-semibold text-slate-900"
                >
                  Cover Image{" "}
                  <span className="text-sm text-gray-600">optional</span>
                </label>
                {isUpload && previewImage && (
                  <div
                    className="cursor-pointer font-bold text-red-400"
                    onClick={() => clearPreviewImage(setFieldValue)}
                  >
                    Clear Preview Image
                  </div>
                )}
                {isUpload && !previewImage && (
                  <div
                    className="cursor-pointer font-bold text-red-400"
                    onClick={() => setIsUpload(false)}
                  >
                    Hide Upload Photo
                  </div>
                )}
              </div>
              {isUpload && (
                <>
                  <input
                    type="file"
                    name="cover_img"
                    hidden
                    ref={fileRef}
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                  <div
                    className="relative flex h-36 items-center justify-center border-2 border-slate-400 md:h-52"
                    onClick={() => fileRef.current.click()}
                  >
                    <LuHardDriveUpload
                      size={32}
                      style={{ color: "#4b5563" }}
                      className="z-10 cursor-pointer"
                    />
                    {isCreate ? (
                      previewImage && (
                        <img
                          src={previewImage}
                          alt={"preview_img"}
                          className="absolute z-0 h-full w-full object-cover opacity-40"
                        />
                      )
                    ) : (
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : `${import.meta.env.VITE_API}/${oldNote.cover_img}`
                        }
                        alt={"preview_img"}
                        className="absolute z-0 h-full w-full object-cover opacity-40"
                      />
                    )}
                  </div>
                </>
              )}
              {!isUpload && (
                <div
                  className="text-slate-700"
                  onClick={() => setIsUpload((prev) => !prev)}
                >
                  Show Upload Photo
                </div>
              )}
            </div>
            <CustomErrorMsg name="cover_img" />
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
            <Field type="text" name="noteID" id="noteID" hidden />
            <button
              className="my-2 w-[90%] rounded-md bg-slate-300 p-2 font-bold text-slate-900 hover:bg-slate-600 hover:text-slate-100"
              type="submit"
            >
              <div className="flex items-center justify-center gap-1">
                <MdOutlineSaveAs size={24} />
                <span>{isCreate ? "Save" : "Update"} Note</span>
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteForm;
