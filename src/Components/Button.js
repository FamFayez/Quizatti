import { Link } from "react-router-dom";
import "./../style/Button.css";

const Button = ({ items }) => {
  return (
    <div className="section-buttons">
      {items.map((item) =>
        item.link ? (
          <Link key={item.id} to={item.link} className="section-button">
            {item.name}
          </Link>
        ) : null
      )}
    </div>
  );
};

export default Button;
