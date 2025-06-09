import "../style/App.css";
import ImageBackground from "../Components/ImageBackground";
import Student from "../assets/img/Studying-rafiki.png";
import Card from "../Components/Card";
import HomeHook from "../hooks/HomeHook";
import Spinner from "../shared/Spinner";

export default function HomePage() {
  const { courses, isLoading } = HomeHook();

  return (
    <main className="container">
      {isLoading && <Spinner />}
      <Card items={courses} />
      <ImageBackground imageSrc={Student} altText="collegeImg" />
    </main>
  );
}
