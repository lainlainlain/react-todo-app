import { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';
import { api } from '../../api/api';

const AddNewTask = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputFormValue, setInputFormValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibleForm = () => {
    setVisibleForm(!visibleForm);
    setInputFormValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputFormValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post(`${api}`, obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleVisibleForm();
      })
      .catch(() => {
        alert('Произошла ошибка!');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            {isLoading ? 'Добавление...' : 'Добавить задачу'}
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
