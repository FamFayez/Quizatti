import { Link } from "react-router-dom";
import "./../style/Card.css";

export default function Card({ items, loading }) {
  return (
    <section className="leftSection">
      {items.map((item) => (
        <Link to={item.link} key={item.id} className="card-link">
          <div className="card">
            <h3>{item.name}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
