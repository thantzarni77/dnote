import Note from "../components/Note";
import Plus from "../components/Plus";

const Index = () => {
  return (
    <div className="mx-auto my-10 flex w-[90%] flex-wrap justify-center gap-4">
      <Note />
      <Note />
      <Note />
      <Note />
      <Plus />
    </div>
  );
};

export default Index;
