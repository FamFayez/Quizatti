import ImageBackground from "../Components/ImageBackground";
import subject from "../assets/img/subject.png";
import "../style/Container.css";
import "../style/Footer.css";
import Card from "../Components/ContentCard";
export default function SubjPage() {
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center h-100">
        <Card />
        <ImageBackground imageSrc={subject} altText="collegeImg" />
      </div>
    </div>
  );
}
