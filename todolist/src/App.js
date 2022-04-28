import { useRef, useState } from "react";
import "./App.css";
import ToDoEditor from "./ToDoEditor";
import ToDoList from "./ToDoList";

const App = () => {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (content) => {
    const created_date = new Date().getTime();
    const newItem = {
      content,
      completed: false,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };
  const onDelete = (targetId) => {
    console.log(`${targetId}가 삭제 되었습니다`);
    const newTodoList = data.filter((it) => it.id !== targetId);
    setData(newTodoList);
  };

  return (
    <div className="App">
      <ToDoEditor onCreate={onCreate} />
      <ToDoList onDelete={onDelete} todolist={data} />
    </div>
  );
};
export default App;
