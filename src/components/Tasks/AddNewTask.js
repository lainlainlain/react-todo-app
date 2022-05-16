import { useState } from "react";
import axios from "axios";
import { db } from "../../firebase"
import { collection, addDoc } from "firebase/firestore";

import addSvg from "../../assets/img/add.svg";

const AddNewTask = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputFormValue, setInputFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    setInputFormValue("");
  };

  // const addTask = () => {
  //   const obj = {
  //     listId: list.id,
  //     text: inputFormValue,
  //     completed: false,
  //   };
  //   setIsLoading(true);
  //   axios
  //     .post("http://localhost:3001/tasks", obj)
  //     .then(({ data }) => {
  //       onAddTask(list.id, data);
  //       toggleVisibleForm();
  //     })
  //     .catch(() => {
  //       alert("Произошла ошибка!");
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const addTask = async (e) => {
    e.preventDefault();
    if (inputFormValue !== "") {
      await addDoc(collection(db, "todos"), {
        listId: list.id,
        text: inputFormValue,
        completed: false,
      });
      setInputFormValue("");
    }
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleVisibleForm} className="tasks__form-new">
          <img src={addSvg} alt="add icon"></img>
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            type="text"
            className="field"
            placeholder="Название задачи"
            value={inputFormValue}
            onChange={(e) => setInputFormValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : "Добавить задачу"}
          </button>
          <button onClick={toggleVisibleForm} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewTask;
