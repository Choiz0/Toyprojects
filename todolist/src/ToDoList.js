import { useState } from "react";

const ToDoList = ({ todolist, onDelete }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (v) => {
    setChecked(!v);
  };
  return (
    <div className="ToDoList">
      <h4>Total Todo :{todolist.length}</h4>
      <ul id="myUL">
        {todolist.map((it) => (
          <>
            <li>
              {it.content}

              <i
                className="fa fa-trash-o"
                style={{ fontSize: "25px" }}
                onClick={() => {
                  onDelete(it.id);
                }}
              ></i>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

ToDoList.defaultProps = {
  ToDoList: [],
};

export default ToDoList;
