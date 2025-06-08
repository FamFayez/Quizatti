import Card from "../Components/Card";
import ImageBackground from "../Components/ImageBackground";
import "../../style/Container.css";
import Doctor from "../../assets/img/Doctor.png";
import { Courses } from "../core/data/Courses";

const HomeDR = () => {
  return (
    <main className="container">
      <Card items={Courses} />

      <ImageBackground imageSrc={Doctor} altText="collegeImg" />
    </main>
  );
};

export default HomeDR;
