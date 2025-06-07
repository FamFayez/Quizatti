import { Link } from "react-router-dom";
import "./../style/Card.css";

export default function Card({ items, loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="leftSection">
      {items.map((course) => (
        <Link to={`/course/${course._id}`} key={course._id} className="card-link">
          <div className="card">
            <h3>{course.name}</h3> {/* ✅ Display course name */}
          </div>
        </Link>
      ))}
    </section>
  );
}
