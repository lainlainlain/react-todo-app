import axios from "axios";

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddNewTask from "./AddNewTask";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
  const editTitle = () => {
    const newTitle = prompt("Введение название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Запрос не отправлен");
        });
    }
  };

  return (
    <div className="tasks">
      <div className="tasks__title">
        {list.name}
        <img src={editSvg} alt="edit" onClick={editTitle} />
      </div>
      <div className="tasks__items">
        {!list.tasks.length && <h2>Задачи отсуствуют</h2>}
        {list.tasks.map((task) => {
          return (
            <div key={task.id} className="tasks__items-row">
              <div className="checkbox">
                <input id={`task-${task.id}`} type="checkbox"></input>
                <label htmlFor={`task-${task.id}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              <input readOnly value={task.text}></input>
            </div>
          );
        })}
        <AddNewTask list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
