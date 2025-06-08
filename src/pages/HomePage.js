import "../../style/App.css";
import ImageBackground from "../Components/ImageBackground";
import Student from "../../assets/img/Studying-rafiki.png";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card"; // make sure this is correct

export default function HomePage() {
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0
  });

  useEffect(() => {
  setCourses(c => ({ ...c, loading: true }));

  axios.get("https://api.quizatty.com/api/v1/course")
    .then((resp) => {
      setCourses(c => ({
        ...c,
        results: resp.data.data,
        loading: false,
        err: null
      }));
    })
    .catch((err) => {
      setCourses(c => ({
        ...c,
        loading: false,
        err: "Something went wrong"
      }));
    });
}, [courses.reload]); // ✅ safe now

  return (
    <main className="container">
      {/* ✅ Pass the data to Card */}
      <Card items={courses.results} loading={courses.loading} />
      <ImageBackground imageSrc={Student} altText="collegeImg" />
    </main>
  );
}
