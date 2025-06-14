import { Link } from "react-router-dom";
import "./../style/Card.css";
import { COURSE_URL } from "../utils/constants";

export default function Card({ items }) {
  return (
    <section className="leftSection">
      {items.length === 0 && (
        <p className="text-white fs-4 text-center">No Courses Yet</p>
      )}
      {items.map((item) => (
        <Link
          to={`${COURSE_URL}/${item.id}/`}
          key={item.id}
          className="card-link"
        >
          <div className="card">
            <h3>{item.name}</h3>
            <h4>{item.code}</h4>
          </div>
        </Link>
      ))}
    </section>
  );
}
