import { Quiz } from "../../core/data/Quiz";
import quiz from "../../assets/img/quiz.png";
import Card from "../Components/Card";
import ImageBackground from "../Components/ImageBackground";

const QuizDR = () => {
  return (
    <div className="container">
      <Card items={Quiz} />
      <ImageBackground imageSrc={quiz} altText="quiz" />
    </div>
  );
};

export default QuizDR;
