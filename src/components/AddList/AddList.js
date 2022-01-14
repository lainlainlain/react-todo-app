import { useState } from "react";
import List from "../List/List";
import Badge from "../UI/Badge/Badge";

import "./AddList.scss";
import closeSvg from "../../assets/img/close.svg";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const onClose = () => {
    setSelectedColor(colors[0].id);
    setInputValue("");
    setVisiblePopup(false);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название");
      return;
    }
    const color = colors.filter((color) => color.id === selectedColor)[0].name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      color,
    });
    onClose();
  };

  return (
    <div className="add-list">
      <List
        onClickPopup={() => {
          setVisiblePopup(true);
        }}
        props={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            name: "Добавить список ",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="close"
            className="add-list__popup-close-btn"
            onClick={onClose}
          ></img>
          <input
            type="text"
            className="field"
            placeholder="Название папки"
            onChange={(e) => setInputValue(e.target.value)}
          ></input>
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onSelectedColor={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              ></Badge>
            ))}
          </div>
          <button onClick={addList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
