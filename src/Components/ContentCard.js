import { Link } from "react-router-dom";
import "./../style/Card.css";
import { CONTENT_URL } from "../utils/constants";

export default function ContentCard({ items, loading }) {
  return (
    <section className="leftSection">
      
        <Link
          to={`${CONTENT_URL}/${item.id}`}
          key={item.id}
          className="card-link"
        >
          <div className="card">
            <h3>{Content}</h3>
          </div>
        </Link>
    
    </section>
  );
}