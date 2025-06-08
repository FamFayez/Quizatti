// import Header from "../../Components/Header";
import { QizzesData } from "../core/data/Quizzes";
import quiz from "../../assets/img/quiz.png";
import ImageBackground from "../Components/ImageBackground";
import Button from "../Components/Button";
import "../../style/Container.css";
import "../../style/Button.css";

export default function QuizzesPage() {
  return (
    <div className="container">
      <div className="section-content">
        <Button items={QizzesData} />
      </div>

      <ImageBackground imageSrc={quiz} altText="Material" />
    </div>
  );
}
