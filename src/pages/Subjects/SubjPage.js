import Header from "../../Components/Header";
import Card from "../../Components/Card";
import Footer from "../../shared/Footer";
import "../../style/App.css";
import { SubjectData } from "../../core/data/subjectData";
import ImageBackground from "../../Components/ImageBackground";
import subject from "../../assets/img/subject.png";
import "../../style/Container.css";
import "../../style/Footer.css";
export default function SubjPage() {
  return (
    <div>
      <Header name="Subject" />
      <div className="container">
        <Card items={SubjectData} />
        <ImageBackground imageSrc={subject} altText="collegeImg" />
      </div>
      <Footer />
    </div>
  );
}
