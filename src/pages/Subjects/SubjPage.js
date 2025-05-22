import { Link } from "react-router-dom";
import Header from "../Components/Header";
import SmallCard from "../Components/smallCard";
import "../../style/App.css";

export default function SubjPage() {
  return (
    <div className="Subpage">
      <Header name="Subject" />
      <div className="subjectList">
        <Link to="/Content">
          <SmallCard name="Content" />
        </Link>
        <Link to="/quizzes">
          <SmallCard name="Quiz" />
        </Link>
        <Link to="/SectionTA">
          <SmallCard name="Section" />
        </Link>
      </div>
    </div>
  );
}
