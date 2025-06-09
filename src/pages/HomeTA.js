import Card from "../Components/Card";
import ImageBackground from "../Components/ImageBackground";
import "../style/Container.css";
import college from "../assets/img/college.png";
import { CoursesTA } from "../core/data/CoursesTA";

const HomeTA = () => {
  return (
    <main className="container">
      <Card items={CoursesTA} />
      <ImageBackground imageSrc={college} altText="collegeImg" />
    </main>
  );
};

export default HomeTA;
