import Mainheader from "../Components/Mainheader";
import SubjectList from "../Components/SubjectList";
import "../../style/App.css";
export default function HomePage() {
  return (
    <div className="homePage">
      <Mainheader />
      <SubjectList />
    </div>
  );
}
