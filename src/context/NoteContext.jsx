import { createContext } from "react";
import { FallingLines } from "react-loader-spinner";

export const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
  const context_value = {
    loader: (
      <FallingLines
        color="#E2E8F0"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    ),
  };
  return (
    <NoteContext.Provider value={context_value}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
