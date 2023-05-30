import { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List/List';
import Badge from '../UI/Badge/Badge';

import './AddList.scss';
import closeSvg from '../../assets/img/close.svg';
import api from '../../api/api';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setSelectedColor(colors[0].id);
    setInputValue('');
    setVisiblePopup(false);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название');
      return;
    }
    setIsLoading(true);
    axios
      .post(`https://json-server-todoapp-mocha.vercel.app/lists`, {
        name: inputValue,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        const color = colors.filter((color) => color.id === selectedColor)[0];
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list">
      <List
        onClickPopup={() => {
          setVisiblePopup(true);
        }}
        props={[
          {
            className: 'list__add-button',
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1V11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 6H11"
                  stroke="#868686"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: 'Добавить список ',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="close"
            className="add-list__popup-close-btn"
            onClick={onClose}></img>
          <input
            type="text"
            className="field"
            placeholder="Название папки"
            onChange={(e) => setInputValue(e.target.value)}></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onSelectedColor={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && 'active'}></Badge>
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
