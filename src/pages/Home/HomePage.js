// import SubjectList from "../../Components/SubjectList";
import "../../style/App.css";
import { Data } from "../../core/data/Subjects";
import Card from "../../Components/Card";
import ImageBackground from "../../Components/ImageBackground";
import Student from "../../assets/img/Studying-rafiki.png";

export default function HomePage() {
  return (
    <main className="container">
      <Card items={Data} />

      <ImageBackground imageSrc={Student} altText="collegeImg" />
    </main>
  );
}
