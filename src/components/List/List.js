import "./List.scss";
import classNames from "classnames";
import Badge from "../UI/Badge/Badge";
import removeSvg from "../../assets/img/remove.svg";

const List = ({ props, onClickPopup, isRemovable, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      onRemove(item);
    }
  };

  return (
    <ul onClick={onClickPopup} className="list">
      {props.map((item, index) => {
        return (
          <li
            key={index}
            className={classNames(item.className, { active: item.active })}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
            <span>{item.name}</span>
            {isRemovable && (
              <img
                src={removeSvg}
                alt="remove icon"
                className="list__remove-icon"
                onClick={() => removeList(item)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
