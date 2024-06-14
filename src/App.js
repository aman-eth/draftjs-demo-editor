import { useState } from "react";
import "./App.css";
import CustomEditor from "./CustomEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedData = localStorage.getItem("editorContent");
    return savedData
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(savedData)))
      : EditorState.createEmpty();
  });

  const saveEditorState = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent());
    localStorage.setItem("editorContent", JSON.stringify(rawContent));
  };

  return (
    <div className="h-[calc(100vh-80px)] mt-10 container mx-auto px-5 md:px-0">
      <div className="h-full w-full  flex flex-col">
        <div className="sm:text-center pb-3 font-bold relative">
          Demo editor by Aman Sharma
          <button
            onClick={saveEditorState}
            className="absolute right-0 sm:right-3 bottom-3 border-2 border-black py-0.5 px-5 shadow-md shadow-black hover:bg-gray-300"
          >
            Save
          </button>
        </div>
        <div className="h-full w-full border border-black overflow-auto px-2 rounded-md">
          <div className="h-2" />
          <CustomEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
