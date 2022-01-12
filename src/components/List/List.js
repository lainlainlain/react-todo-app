import "./List.scss";
import classNames from "classnames";
import Badge from "../UI/Badge/Badge";

const List = ({ props, onClickPopup }) => {
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
          </li>
        );
      })}
    </ul>
  );
};

export default List;
