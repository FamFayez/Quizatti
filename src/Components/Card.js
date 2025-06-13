import { Link } from "react-router-dom";
import "./../style/Card.css";
import { COURSE_URL } from "../utils/constants";

export default function Card({ items }) {
  return (
    <section className="leftSection">
      {items.map((item) => (
        <Link
          to={`${COURSE_URL}/${item.id}/`}
          key={item.id}
          className="card-link"
        >
          <div className="card">
            <h3>{item.name}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
}
