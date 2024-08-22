import { ErrorMessage } from "formik";

const CustomErrorMsg = ({ name }) => {
  return (
    <div className="mx-auto my-1 w-[90%] self-start text-red-700">
      <ErrorMessage name={name} />
    </div>
  );
};

export default CustomErrorMsg;
