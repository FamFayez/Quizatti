import Card from "../Components/Card";
import ImageBackground from "../Components/ImageBackground";
import "../style/Container.css";
import college from "../assets/img/college.png";
import { Chapter } from "../core/data/Chapter";

const ChaptersDR = () => {
  return (
    <div className="container">
      <Card items={Chapter} />

      <ImageBackground imageSrc={college} altText="collegeImg" />
    </div>
  );
};

export default ChaptersDR;
