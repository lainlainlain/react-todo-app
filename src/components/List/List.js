import axios from "axios";

import "./List.scss";
import classNames from "classnames";
import Badge from "../UI/Badge/Badge";
import removeSvg from "../../assets/img/remove.svg";

const List = ({
  props,
  onClickPopup,
  isRemovable,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      axios.delete("https://json-server-backend-fortodoapp.herokuapp.com/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClickPopup} className="list">
      {props.map((item, index) => {
        return (
          <li
            key={index}
            className={classNames(item.className, {
              active: item.active
                ? item.active
                : activeItem && activeItem.id === item.id,
            })}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && `(${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                src={removeSvg}
                alt="remove icon"
                className="list__remove-icon"
                onClick={() => {
                  removeList(item);
                }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
