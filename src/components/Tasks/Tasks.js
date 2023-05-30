import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Tasks.scss';
import editSvg from '../../assets/img/edit.svg';
import AddNewTask from './AddNewTask';
import NewTask from './NewTask';
import api from '../../api/api';

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = prompt('Введение название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(`https://json-server-todoapp-mocha.vercel.app/` + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Запрос не отправлен');
        });
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <div style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img src={editSvg} alt="edit" onClick={editTitle} />
        </div>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсуствуют</h2>}
        {list.tasks &&
          list.tasks.map((task) => (
            <NewTask
              key={task.id}
              list={list}
              onRemove={onRemoveTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddNewTask key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
