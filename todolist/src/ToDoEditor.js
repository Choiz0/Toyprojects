import { useRef, useState } from "react";

const ToDoEditor = ({ onCreate }) => {
  const contentInput = useRef();

  const [state, setState] = useState("");

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    onCreate(state);
    setState("");
  };

  return (
    <div id="myDIV" class="header">
      <h2>My To Do List</h2>
      <input
        type="text"
        id="myInput"
        placeholder="Title..."
        onChange={handleChangeState}
        value={state}
      />
      <span onClick={handleSubmit} class="addBtn">
        Add
      </span>
    </div>
  );
};
export default ToDoEditor;
