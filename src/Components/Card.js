import { Link } from "react-router-dom";
import "./../style/Card.css";

const Card = ({ items }) => {
  return (
    <section className="leftSection">
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <Link to={item.link} key={item.id} className="card-link">
            <div className="card">
              <h3>{item.name}</h3>
            </div>
          </Link>
        ))}
    </section>
  );
};

export default Card;
