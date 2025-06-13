import "../style/App.css";
import ImageBackground from "../Components/ImageBackground";
import Doctor from "../assets/img/Doctor.png";
import Card from "../Components/Card";
import HomeHook from "../hooks/HomeHook";
import Spinner from "../shared/Spinner";

export default function HomePage() {
  const { courses, isLoading } = HomeHook();

  const userRole = localStorage.getItem("role");
  console.log("Role:", userRole);
  return (
    <main className="container">
      {isLoading && <Spinner />}
      <Card items={courses} />
      <ImageBackground imageSrc={Doctor} altText="collegeImg" />
    </main>
  );
}
