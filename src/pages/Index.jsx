import Note from "../components/Note";
import Plus from "../components/Plus";

const Index = () => {
  return (
    <div className="mx-auto my-5 flex w-[90%] flex-wrap justify-center gap-4">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plus />
    </div>
  );
};

export default Index;
